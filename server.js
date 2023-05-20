const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

// Configura los middlewares y rutas de tu aplicación

// Ruta para servir los archivos estáticos de React
app.use(express.static(path.join(__dirname, 'client/build')));

// Obtén la ruta del certificado y la clave privada
const certPath = path.resolve(__dirname, 'cert.pem');
const keyPath = path.resolve(__dirname, 'key.pem');

// Crea el servidor HTTPS
const server = https.createServer(
  {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  },
  app
);

// Inicia el servidor
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor HTTPS iniciado en el puerto ${port}`);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
  