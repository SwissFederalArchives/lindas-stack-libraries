import rdfEnvironment from '@lindas/env/web.js';
import { rdf, schema, sh, spex } from './namespace';
/**
 * Extracts a SPEX data model from a given dataset SHACL description.
 *
 * @param {Clownface} dataset - Pointer to the dataset description
 * @returns {Object} SPEX datamodel
 */
export function dataModelFromSHACL(cfGraph, language, shrink) {
    const defaultShapes = cfGraph.out(spex.shape).has(rdf.type, spex.DefaultShapes);
    const tables = defaultShapes.term
        ? tablesFromSHACL(defaultShapes.out(schema.hasPart), shrink)
        : [];
    const viewports = cfGraph.out(spex.viewport).map(viewport => ({
        id: viewport.term.value,
        term: viewport.term,
        name: viewport.out(schema `name`, { language }).value,
        tables: new Set(viewport.out(spex.includes).terms.map(({ value }) => value)),
    }));
    return {
        tables,
        viewports,
        isIntrospected: false,
    };
}
export function tablesFromSHACL(shapes, shrink) {
    return shapes
        .toArray()
        .flatMap((shape) => {
        const targetClass = shape.out(sh.targetClass).term;
        if (!targetClass) {
            return [];
        }
        const targetClassIri = targetClass.value;
        const properties = shape
            .out(sh.property).toArray()
            .flatMap((property) => {
            const path = property.out(sh.path).term;
            if (!path) {
                return [];
            }
            const predicateIri = path.value;
            const values = propertyTypes(property, shrink);
            return {
                id: predicateIri,
                name: shrink(predicateIri),
                values,
            };
        });
        return {
            id: targetClassIri,
            name: shrink(targetClassIri),
            properties,
            isShown: true,
        };
    });
}
function propertyTypes(property, shrink) {
    const datatypeConstraint = property.out(sh.datatype).terms.map((datatype) => typeFromTerm(datatype, shrink));
    const classConstraint = property.out(sh.class).terms.map((cls) => typeFromTerm(cls, shrink));
    let orConstraint = [];
    const orList = property.out(sh.or).list();
    if (orList !== null) {
        orConstraint = [...orList].flatMap((conditionalProp) => propertyTypes(conditionalProp, shrink));
    }
    return [
        ...datatypeConstraint,
        ...classConstraint,
        ...orConstraint,
    ];
}
function typeFromTerm(term, shrink) {
    return {
        id: term.value,
        name: shrink(term.value),
        termType: term.termType,
    };
}
/**
 * Serializes the datamodel as a SHACL description.
 *
 * @param {Object} datamodel - SPEX datamodel
 * @param {string} datasetURI - URI of the dataset (.well-known/void)
 * @returns {Clownface} - Pointer to the dataset description
 */
export function dataModelToSHACL(datamodel, datasetURI) {
    const cfGraph = rdfEnvironment.clownface({
        dataset: rdfEnvironment.dataset(),
        term: rdfEnvironment.namedNode(datasetURI)
    });
    cfGraph.addOut(spex.shape, defaultShapes => {
        defaultShapes.addOut(rdf.type, spex.DefaultShapes);
        datamodel.tables.forEach(table => {
            defaultShapes.addOut(schema.hasPart, shape => {
                shape
                    .addOut(rdf.type, sh.NodeShape)
                    .addOut(sh.targetClass, rdfEnvironment.namedNode(table.id));
                table.properties.forEach(property => {
                    shape.addOut(sh.property, propertyShape => {
                        propertyShape
                            .addOut(rdf.type, sh.PropertyShape)
                            .addOut(sh.path, rdfEnvironment.namedNode(property.id));
                        const typeProp = (type) => type.termType === 'NamedNode'
                            ? [sh.class, rdfEnvironment.namedNode(type.id)]
                            : [sh.datatype, rdfEnvironment.namedNode(type.id)];
                        if (property.values.length === 1) {
                            const v = typeProp(property.values[0]);
                            propertyShape.addOut(v[0], v[1]);
                        }
                        else if (property.values.length > 1) {
                            propertyShape.addList(sh.or, property.values.map(value => {
                                const v = typeProp(value);
                                return propertyShape.blankNode().addOut(v[0], v[1]);
                            }));
                        }
                    });
                });
            });
        });
    });
    return cfGraph;
}
//# sourceMappingURL=shacl.js.map