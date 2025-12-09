export class TestFactory {
    test() {
        return this.dataset([
            this.quad(this.blankNode(), this.namedNode('http://example.org/'), this.literal('test')),
        ]);
    }
    static get exports() {
        return ['test'];
    }
}
