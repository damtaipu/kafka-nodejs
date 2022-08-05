const express = require('express');
const callKafka = require('./express');

const app = express();
new callKafka();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3042, () => {
    console.log('Server is up')
})