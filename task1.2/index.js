const csv = require('csvtojson');
const fs = require('fs')

const csvFilePath = './csv/nodejs19-hw1-ex1.csv'
const txtFilePath = './task1.2/txt/nodejs19-hw1-ex2.txt';

const convertCsvToTxtFile = async () => {
  try {
    const jsonArray = await csv().fromFile(csvFilePath);
    const txtFileContent = jsonArrayToString(jsonArray, '\n');
    writeFile(txtFileContent, txtFilePath);
  } catch (err) {
    console.log(`Reading csv file error: ${err}`);
  }
};

const jsonArrayToString = (jsonArray, delimiter = '') => {
  let string = '';
  jsonArray.forEach((obj) => {
    string += `${JSON.stringify(obj)}${delimiter}`;
  });
  return string;
};

const writeFile = (fileContent, filePath) => {
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.log(`Writing file error: ${err}`);
    } else {
      console.log('File written successfully!');
    }
  });
};

convertCsvToTxtFile();
