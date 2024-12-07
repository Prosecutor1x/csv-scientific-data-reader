const fs = require('fs');
const csvParser = require('csv-parser');

const analyzeCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const columns = [];
    let rowCount = 0;

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('headers', (headers) => {
        columns.push(...headers);
      })
      .on('data', () => {
        rowCount++;
      })
      .on('end', () => {
        resolve({ columns, rowCount });
      })
      .on('error', (error) => reject(error));
  });
};

module.exports = { analyzeCSV };
