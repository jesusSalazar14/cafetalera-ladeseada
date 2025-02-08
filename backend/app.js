const express = require('express');
const bodyParser = require('body-parser');
const loteRoutes = require('./routes/lote');
const secadoRoutes = require('./routes/secado');
const recoleccionRoutes = require('./routes/recoleccion');
const lavadoRoutes = require('./routes/lavado');
const fermentacionRoutes = require('./routes/fermentacion');
const despulpadoRoutes = require('./routes/despulpado');
const clasificacionRoutes = require('./routes/clasificacion');

const app = express();
app.use(bodyParser.json());

app.use('/api/lote', loteRoutes.router); 
app.use('/api/secado', secadoRoutes.router);
app.use('/api/recoleccion', recoleccionRoutes.router);
app.use('/api/lavado', lavadoRoutes.router);
app.use('/api/fermentacion', fermentacionRoutes.router);
app.use('/api/despulpado', despulpadoRoutes.router);
app.use('/api/clasificacion', clasificacionRoutes.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});