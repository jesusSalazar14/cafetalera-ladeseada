const mysql = require('mysql');
const db = require('../db');

const fermentacionModel = {
  getAll: (callback) => {
    db.query('SELECT * FROM fermentacion', (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM fermentacion WHERE id = ?', id, (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },
  create: (data, callback) => {
    db.query('INSERT INTO fermentacion SET ?', data, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  update: (id, data, callback) => {
    db.query('UPDATE fermentacion SET ? WHERE id = ?', [data, id], (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },
  delete: (id, callback) => {
    db.query('DELETE FROM fermentacion WHERE id = ?', id, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = fermentacionModel;