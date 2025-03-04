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
  const query = 'SELECT * FROM usuarios WHERE username = ?';
  db.query(query, [nombre, username, correo, hashedClave], (err, result) => {
    if (err) {
      console.error('Error obteniendo usuario:', err);
      res.status(500).send({ message: 'Error obteniendo usuario' });
    } else {
      if (result.length > 0) {
        res.status(400).send({ message: 'Username ya existe' });
      } else {
        const query = 'INSERT INTO usuarios (nombre, username, correo, clave) VALUES (?, ?, ?, ?)';
        db.query(query, [nombre, username, correo, hashedClave], (err, result) => {
          if (err) {
            console.error('Error registrando usuario:', err);
            res.status(500).send({ message: 'Error registrando usuario' });
          } else {
            res.status(201).send({ message: 'Registro exitoso' });
          }
        });
      }
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
        const username = result[0];
        const isValidClave = bcrypt.compareSync(clave, username.clave);
        if (!isValidClave) {
          res.status(401).send({ message: 'Contraseña incorrecta' });
        } else {
          const token = jwt.sign({ userId: result[0].id }, 'secretkey', { expiresIn: '1h', algorithm: 'HS256' });
          db.query('UPDATE usuarios SET token = ? WHERE id = ?', [token, result[0].id], (err, result) => {
            if (err) {
              console.error('Error actualizando token:', err);
              res.status(500).send({ message: 'Error actualizando token' });
            } else {
              res.status(200).send({ token });
            }
          });
        }
      }
    }
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