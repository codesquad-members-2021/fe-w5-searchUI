const express = require('express');

const PORT = 3000;

const app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/app.bundle.js', (req, res) => {
  res.sendFile(__dirname + '/app.bundle.js');
});

app.get('/app.bundle.js.map', (req, res) => {
  res.sendFile(__dirname + '/app.bundle.js.map');
});

app.get('/json/recomKeyword.json', (req, res) => {
  res.sendFile(__dirname + req.url);
});

app.get('/json/suggest/:q', (req, res) => {
  res.sendFile(__dirname + '/json/suggest/' + req.params.q + '.json');
});

app.listen(PORT, console.log('run server!'));
