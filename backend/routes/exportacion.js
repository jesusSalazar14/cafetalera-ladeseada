const express = require('express');
const router = express.Router();
const Exportacion = require('../models/exportacion');

router.get('/', (req, res) => {
  Exportacion.getAll((err, exportaciones) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(exportaciones);
    }
  });
});

router.get('/:id', (req, res) => {
  Exportacion.getById(req.params.id, (err, exportacion) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(exportacion);
    }
  });
});

router.post('/', (req, res) => {
  const { lote_id, fecha, cantidad, destinatario, precio } = req.body;
  if (!lote_id || !fecha || !cantidad || !destinatario || !precio) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Exportacion.create({ lote_id, fecha, cantidad, destinatario, precio }, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(result);
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { lote_id, fecha, cantidad, destinatario, precio } = req.body;
  if (!lote_id || !fecha || !cantidad || !destinatario || !precio) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Exportacion.update(id, { lote_id, fecha, cantidad, destinatario, precio }, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Exportacion.delete(id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };