const mysql = require('mysql');
const db = require('../db');

const clasificacionModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM clasificacion', (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM clasificacion WHERE id = ?', id, (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },
  create: (data, callback) => {
    db.query('INSERT INTO clasificacion SET ?', data, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  update: (id, data, callback) => {
    db.query('UPDATE clasificacion SET ? WHERE id = ?', [data, id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  delete: (id, callback) => {
    db.query('DELETE FROM clasificacion WHERE id = ?', id, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = clasificacionModel;