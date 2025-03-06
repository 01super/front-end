const express = require('express');
const logger = require('morgan');
const { StatusCodes } = require('http-status-codes');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
fs.ensureDirSync(path.join(__dirname, 'public'));
// 存放分片文件
fs.ensureDirSync(path.join(__dirname, 'tmp'));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', (req, res) => {
  const { file } = req.body;
  const { name, size, type } = file;
  const filePath = path.join(__dirname, 'tmp', name);
  fs.writeFileSync(filePath, file);
  res.status(StatusCodes.OK).json({ message: 'File uploaded successfully' });
});

app.get('/merge:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'tmp', filename);
  const file = fs.readFileSync(filePath);
  res.status(StatusCodes.OK).json({ file });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
