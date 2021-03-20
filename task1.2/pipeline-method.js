const { pipeline } = require('stream');
const csv = require('csvtojson');
const fs = require('fs')

const csvFilePath = './csv/nodejs19-hw1-ex1.csv'
const txtFilePath = './task1.2/txt/nodejs19-hw1-ex2-pipeline.txt';

const csvToTxtWithPipelineMethod = () => {
  pipeline(
    fs.createReadStream(csvFilePath),
    csv(),
    fs.createWriteStream(txtFilePath),
    (err) => {
      if (err) {
        console.error(`Writing file pipeline method error: ${err}`);
      } else {
        console.log('File written successfully with pipelne method!');
      }
    });
};

csvToTxtWithPipelineMethod();