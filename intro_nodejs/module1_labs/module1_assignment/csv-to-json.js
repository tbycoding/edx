const csv = require('csvtojson');
const fs = require('fs');

const csvFilePath = ('customer-data.csv');
csv().fromFile(csvFilePath).then((jsonObj) => {
  const fileName = 'customer-data.json';
  const customerData = JSON.stringify(jsonObj, null, "\t");
  fs.writeFile(fileName, customerData, (error) => {
    if (error) throw error;
    console.log(`Customer data logged to ${fileName}.`);
  });
});