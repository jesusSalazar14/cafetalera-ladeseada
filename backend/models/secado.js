const mysql = require('mysql');
const db = require('../db');

const secadoModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM secado', (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM secado WHERE id = ?', id, (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },
  create: (data, callback) => {
    db.query('INSERT INTO secado SET ?', data, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  update: (id, data, callback) => {
    db.query('UPDATE secado SET ? WHERE id = ?', [data, id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  delete: (id, callback) => {
    db.query('DELETE FROM secado WHERE id = ?', id, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = secadoModel;