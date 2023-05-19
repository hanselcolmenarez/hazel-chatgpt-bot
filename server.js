const https = require('https');
const fs = require('fs');
const app = require('./app');

const options = {
  key: fs.readFileSync('/opt/ssl-certs/key.pem'),
  cert: fs.readFileSync('/opt/ssl-certs/cert.pem'),
};

https.createServer(options, app).listen(443, () => {
  console.log('Servidor HTTPS iniciado en el puerto 443');
});

app.listen(3000, () => {
  console.log('Servidor HTTP iniciado en el puerto 3000');
});

app.use('/', App);
