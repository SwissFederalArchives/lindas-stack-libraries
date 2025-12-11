import { expect } from 'chai'
import { prefixes, vocabularies } from '../index.js'

describe('@lindas/vocabulary-extras', () => {
  describe('prefixes', () => {
    it('should export prefixes object', () => {
      expect(prefixes).to.be.an('object')
    })
  })

  describe('vocabularies', () => {
    it('should export vocabularies loader function', () => {
      expect(vocabularies).to.be.a('function')
    })
  })
})
