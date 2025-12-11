import { expect } from 'chai'
import * as strict from '../strict.js'

describe('@lindas/vocabulary-extras-builders', () => {
  describe('strict exports', () => {
    it('should export namespace builders', () => {
      expect(typeof strict).to.equal('object')
      expect(Object.keys(strict).length).to.be.greaterThan(0)
    })
  })
})
