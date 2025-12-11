import { expect } from 'chai'
import prefixes, { expand, shrink } from '../index.js'

describe('@lindas/prefixes', () => {
  describe('prefixes', () => {
    it('should export prefixes object', () => {
      expect(prefixes).to.be.an('object')
    })

    it('should contain common RDF prefixes', () => {
      expect(prefixes).to.have.property('rdf')
      expect(prefixes).to.have.property('rdfs')
      expect(prefixes).to.have.property('xsd')
    })
  })

  describe('expand', () => {
    it('should expand prefixed URIs', () => {
      const expanded = expand('rdf:type')
      expect(expanded).to.equal('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
    })

    it('should return empty string for invalid input', () => {
      const expanded = expand('invalid')
      expect(expanded).to.equal('')
    })

    it('should throw for unknown prefix', () => {
      expect(() => expand('unknown:term')).to.throw('Unavailable prefix')
    })
  })

  describe('shrink', () => {
    it('should shrink full URIs to prefixed form', () => {
      const shrunk = shrink('http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
      expect(shrunk).to.equal('rdf:type')
    })

    it('should return empty string if no prefix matches', () => {
      const uri = 'http://unknown.example.org/term'
      const shrunk = shrink(uri)
      expect(shrunk).to.equal('')
    })
  })
})
