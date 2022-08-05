const express = require('express');
const callKafka = require('./express');

const app = express();

app.get('/', function (req, res) {
    new callKafka();
    res.send('Hello World')
})

app.listen(3040, () => {
    console.log('Server is up')
})