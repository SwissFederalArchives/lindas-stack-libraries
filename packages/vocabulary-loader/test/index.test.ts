import { expect } from 'chai'
import { create } from '../index.js'

describe('@lindas/vocabulary-loader', () => {
  describe('create', () => {
    it('should export create function', () => {
      expect(create).to.be.a('function')
    })

    it('should create a loader function from prefix map', () => {
      const prefixMap = {
        test: 'http://example.org/test#'
      }
      const loader = create(prefixMap)
      expect(loader).to.be.a('function')
    })
  })
})
