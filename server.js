const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');

const options = {
  key: fs.readFileSync('/opt/ssl-certs/key.pem'),
  cert: fs.readFileSync('/opt/ssl-certs/cert.pem'),
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.js'));
});

https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS iniciado en el puerto 443');
});
