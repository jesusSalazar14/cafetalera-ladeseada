const mysql = require('mysql');
const db = require('../db');

const loteModel = {
  find: (callback) => {
    db.query('SELECT * FROM lote', (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM lote WHERE id = ?', id, (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  },
  create: (data, callback) => {
    const requiredFields = ['fecha_inicio', 'fecha_fin', 'kilogramos_cereza', 'metodo'];
    const missingFields = requiredFields.filter(field => !Object.prototype.hasOwnProperty.call(data, field));
    if (missingFields.length > 0) {
      callback({ message: 'Faltan campos obligatorios' }, null);
    } else {
      db.query('INSERT INTO lote (fecha_inicio, fecha_fin, kilogramos_cereza, metodo) VALUES (?, ?, ?, ?)', [data.fecha_inicio, data.fecha_fin, data.kilogramos_cereza, data.metodo], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },
  update: (id, data, callback) => {
    const requiredFields = ['fecha_inicio', 'fecha_fin', 'kilogramos_cereza', 'metodo'];
    const missingFields = requiredFields.filter(field => !Object.prototype.hasOwnProperty.call(data, field));
    if (missingFields.length > 0) {
      callback({ message: 'Faltan campos obligatorios' }, null);
    } else {
      db.query('UPDATE lote SET fecha_inicio = ?, fecha_fin = ?, kilogramos_cereza = ?, metodo = ? WHERE id = ?', [data.fecha_inicio, data.fecha_fin, data.kilogramos_cereza, data.metodo, id], (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  },
  delete: (id, callback) => {
    db.query('DELETE FROM lote WHERE id = ?', id, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = loteModel;