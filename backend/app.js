const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const loteRoutes = require('./routes/lote');
const secadoRoutes = require('./routes/secado');
const exportacionRoutes = require('./routes/exportacion');
const lavadoRoutes = require('./routes/lavado');
const fermentacionRoutes = require('./routes/fermentacion');
const despulpadoRoutes = require('./routes/despulpado');
const clasificacionRoutes = require('./routes/clasificacion');
const loginRoutes = require('./routes/login');
const registroRoutes = require('./routes/registro');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cafetalera-ladeseada',
});

db.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.post('/api/registro', (req, res) => {
  const { nombre, username, correo, clave } = req.body;
  const hashedClave = bcrypt.hashSync(clave, 10);
  const query = 'INSERT INTO usuarios (nombre, username, correo, clave) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, username, correo, hashedClave], (err, result) => {
    if (err) {
      console.error('Error registrando usuario:', err);
      res.status(500).send({ message: 'Error registrando usuario' });
    } else {
      const token = jwt.sign({ userId: result.insertId }, 'secretkey', { expiresIn: '1h' });
      const query = 'UPDATE usuarios SET token = ? WHERE id = ?';
      db.query(query, [token, result.insertId], (err, result) => {
        if (err) {
          console.error('Error almacenando token:', err);
          res.status(500).send({ message: 'Error almacenando token' });
        } else {
          res.status(201).send({ token });
        }
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  const { correo, clave } = req.body;
  const query = 'SELECT * FROM usuarios WHERE correo = ?';
  db.query(query, [correo], (err, result) => {
    if (err) {
      console.error('Error obteniendo usuario:', err);
      res.status(500).send({ message: 'Error obteniendo usuario' });
    } else {
      if (result.length === 0) {
        res.status(401).send({ message: 'Usuario no encontrado' });
      } else {
        const usuario = result[0];
        const isValidClave = bcrypt.compareSync(clave, usuario.clave);
        if (!isValidClave) {
          res.status(401).send({ message: 'Contraseña incorrecta' });
        } else {
          const token = jwt.sign({ userId: usuario.id }, 'secretkey', { expiresIn: '1h' });
          res.send({ token });
        }
      }
    }
  });
});

app.use((req, res, next) => {
  const rutasExcluidas = [
    '/api/clasificacion',
    '/api/lote',
    '/api/secado',
    '/api/exportacion',
    '/api/lavado',
    '/api/fermentacion',
    '/api/despulpado',
  ];

  const rutaActual = req.path.split('/').slice(0, 3).join('/');

  if (rutasExcluidas.includes(rutaActual)) {
    return next(); 
  }

  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send({ message: 'No autorizado' });
  }

  jwt.verify(token.split(' ')[1], 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'No autorizado' });
    }
    req.userId = decoded.userId;
    next();
  });
});
app.use('/api/lote', loteRoutes.router);
app.use('/api/secado', secadoRoutes.router);
app.use('/api/exportacion', exportacionRoutes.router);
app.use('/api/lavado', lavadoRoutes.router);
app.use('/api/fermentacion', fermentacionRoutes.router);
app.use('/api/despulpado', despulpadoRoutes.router);
app.use('/api/clasificacion', clasificacionRoutes.router);
app.use('/api/login', loginRoutes);
app.use('/api/registro', registroRoutes.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});