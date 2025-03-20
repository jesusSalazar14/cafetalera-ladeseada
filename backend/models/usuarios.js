const mysql = require('mysql');
const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usuarioModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM usuarios', (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM usuarios WHERE id = ?', id, (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },
  create: (data, callback) => {
    if (!data || !data.nombre || !data.username || !data.correo || !data.clave) {
      callback({ mensaje: 'Faltan datos para crear el usuario' }, null);
    } else {
      const query = 'INSERT INTO usuarios (nombre, username, correo, clave) VALUES (?, ?, ?, ?)';
      const values = [data.nombre, data.username, data.correo, data.clave];
      db.query(query, values, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },
  update: (id, data, callback) => {
    if (!data || !id) {
      callback({ mensaje: 'Faltan datos para actualizar el usuario' }, null);
    } else {
      db.query('UPDATE usuarios SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },
  delete: (id, callback) => {
    if (!id) {
      callback({ mensaje: 'Falta el id del usuario para eliminar' }, null);
    } else {
      db.query('DELETE FROM usuarios WHERE id = ?', id, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },
  login: (identificador, clave, callback) => {
    db.query('SELECT * FROM usuarios WHERE correo = ? OR username = ?', [identificador, identificador], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (row.length === 0) {
        callback(null, null);
      } else {
        const usuario = row[0];
        const isValidClave = bcrypt.compareSync(clave, usuario.clave);
        if (!isValidClave) {
          callback(null, null);
        } else {
          const token = jwt.sign({ id: usuario.id, correo: usuario.correo }, 'secretkey', { expiresIn: '1h' });
          db.query('UPDATE usuarios SET token = ? WHERE id = ?', [JSON.stringify({ token }), usuario.id], (err, result) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, token);
            }
          });
        }
      }
    });
  },
  verificarToken: (token, callback) => {
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, decoded);
      }
    });
  }
};

module.exports = usuarioModel;