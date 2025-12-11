import { Transform } from 'readable-stream';
import ExcelJS from 'exceljs';
export default class XlsxToObjectTransform extends Transform {
    sheet;
    buffers;
    constructor(options = {}) {
        super({
            objectMode: true,
        });
        this.sheet = options.sheet || 0;
        this.buffers = [];
    }
    _transform(data, encoding, done) {
        this.buffers.push(data);
        done();
    }
    async _flush(done) {
        try {
            const data = Buffer.concat(this.buffers);
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(data);
            let worksheet;
            if (typeof this.sheet === 'number') {
                worksheet = workbook.worksheets[this.sheet];
            }
            else {
                worksheet = workbook.getWorksheet(this.sheet);
            }
            if (!worksheet) {
                done();
                return;
            }
            const headers = [];
            let headerRowIndex = 0;
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) {
                    headerRowIndex = rowNumber;
                    row.eachCell((cell, colNumber) => {
                        headers[colNumber - 1] = String(cell.value || '');
                    });
                }
                else {
                    const rowObj = {};
                    row.eachCell((cell, colNumber) => {
                        const header = headers[colNumber - 1];
                        if (header) {
                            rowObj[header] = cell.value;
                        }
                    });
                    this.push({
                        line: rowNumber,
                        row: rowObj,
                    });
                }
            });
            done();
        }
        catch (err) {
            done();
        }
    }
}
