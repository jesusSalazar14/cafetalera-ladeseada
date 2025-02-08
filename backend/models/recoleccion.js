// models/recoleccion.js
const mysql = require('mysql');
const db = require('../db');

const recoleccionModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM recoleccion', (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM recoleccion WHERE id = ?', id, (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },
  create: (data, callback) => {
    db.query('INSERT INTO recoleccion SET ?', data, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  update: (id, data, callback) => {
    db.query('UPDATE recoleccion SET ? WHERE id = ?', [data, id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  delete: (id, callback) => {
    db.query('DELETE FROM recoleccion WHERE id = ?', id, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
 callback(null, result);
      }
    });
  }
};

module.exports = recoleccionModel;