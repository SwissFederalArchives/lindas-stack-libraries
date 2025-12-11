import { Transform } from 'readable-stream'
import ExcelJS from 'exceljs'

export interface Options {
  sheet?: number | string
}

export default class XlsxToObjectTransform extends Transform {
  private readonly sheet: number | string
  private readonly buffers: Buffer[]

  constructor(options: Options = {}) {
    super({
      objectMode: true,
    })

    this.sheet = options.sheet || 0

    this.buffers = []
  }

  _transform(data: Buffer, encoding: unknown, done: () => void) {
    this.buffers.push(data)

    done()
  }

  async _flush(done: () => void) {
    try {
      const data = Buffer.concat(this.buffers)
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(data as unknown as ArrayBuffer)

      let worksheet: ExcelJS.Worksheet | undefined
      if (typeof this.sheet === 'number') {
        worksheet = workbook.worksheets[this.sheet]
      } else {
        worksheet = workbook.getWorksheet(this.sheet)
      }

      if (!worksheet) {
        done()
        return
      }

      const headers: string[] = []
      let headerRowIndex = 0

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          headerRowIndex = rowNumber
          row.eachCell((cell, colNumber) => {
            headers[colNumber - 1] = String(cell.value || '')
          })
        } else {
          const rowObj: Record<string, unknown> = {}
          row.eachCell((cell, colNumber) => {
            const header = headers[colNumber - 1]
            if (header) {
              rowObj[header] = cell.value
            }
          })
          this.push({
            line: rowNumber,
            row: rowObj,
          })
        }
      })

      done()
    } catch (err) {
      done()
    }
  }
}
