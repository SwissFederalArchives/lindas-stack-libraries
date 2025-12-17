import BaseEnvironment from '@rdfjs/environment/Environment.js'
import { extend } from './lib/extend.js'

export default class Environment {
  constructor(factoriesOrChild, { parent, bind = false } = {}) {
    this._parent = parent
    if (factoriesOrChild instanceof BaseEnvironment || factoriesOrChild instanceof Environment) {
      return extend({ parent, child: factoriesOrChild })
    }

    this._factories = factoriesOrChild.slice()

    const extended = parent ? extend({ parent, child: this }) : this

    for (const factory of this._factories) {
      if (typeof factory.prototype.init === 'function') {
        factory.prototype.init.call(extended)
      }

      for (const method of factory.exports || []) {
        if (bind) {
          this[method] = factory.prototype[method].bind(extended)
        } else {
          this[method] = factory.prototype[method]
        }
      }
    }

    return extended
  }

  clone() {
    // Ensure we pass the parent option correctly
    const options = this._parent ? { parent: this._parent } : {}
    const env = new Environment(this._factories, options)

    for (const factory of env._factories) {
      if (typeof factory.prototype.clone === 'function') {
        factory.prototype.clone.call(env, this)
      }
    }

    return env
  }
}
