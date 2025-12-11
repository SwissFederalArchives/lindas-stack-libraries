import assert from 'assert'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getStreamAsArray as streamToArray } from 'get-stream'
import XlsxToObjectTransform from '../lib/XlsxToObjectTransform.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface TransformOutput {
  row: Record<string, string>
  line: number
}

describe('XlsxToObjectTransform', () => {
  it('should be a constructor', () => {
    assert.strictEqual(typeof XlsxToObjectTransform, 'function')
  })

  it('should transform a XLSX stream to an object stream', () => {
    const input = fs.createReadStream(path.join(__dirname, 'support/example.xlsx'))
    const transform = new XlsxToObjectTransform()

    input.pipe(transform)

    return streamToArray(transform).then((array: unknown[]) => {
      const item = array.shift() as TransformOutput
      assert.strictEqual(typeof item.row, 'object')
    })
  })

  it('should transform a XLSX stream to an object stream with line number', () => {
    const input = fs.createReadStream(path.join(__dirname, 'support/example.xlsx'))
    const transform = new XlsxToObjectTransform()

    input.pipe(transform)

    return streamToArray(transform).then((array: unknown[]) => {
      const item = array.shift() as TransformOutput
      assert.strictEqual(item.line, 2)
    })
  })

  it('should choose the first sheet', () => {
    const input = fs.createReadStream(path.join(__dirname, 'support/example.xlsx'))
    const transform = new XlsxToObjectTransform()

    input.pipe(transform)

    return streamToArray(transform).then((array: unknown[]) => {
      const item = array[0] as TransformOutput
      assert.strictEqual(item.row.s0col0, 's0col0row0')
    })
  })

  it('should parse the sheet with the given number', () => {
    const input = fs.createReadStream(path.join(__dirname, 'support/example.xlsx'))
    const transform = new XlsxToObjectTransform({ sheet: 1 })

    input.pipe(transform)

    return streamToArray(transform).then((array: unknown[]) => {
      const item = array[0] as TransformOutput
      assert.strictEqual(item.row.s1col0, 's1col0row0')
    })
  })

  it('should parse the sheet with the given name', () => {
    const input = fs.createReadStream(path.join(__dirname, 'support/example.xlsx'))
    const transform = new XlsxToObjectTransform({ sheet: 'sheet1' })

    input.pipe(transform)

    return streamToArray(transform).then((array: unknown[]) => {
      const item = array[0] as TransformOutput
      assert.strictEqual(item.row.s1col0, 's1col0row0')
    })
  })
})
