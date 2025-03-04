const express = require('express');
const router = express.Router();
const Exportacion = require('../models/exportacion');

router.get('/', (req, res) => {
  Exportacion.find((err, exportaciones) => {
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
    res.status(400).send({ message: 'Faltan campos obligatorios' });
  } else {
    Exportacion.create(req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send({ message: 'Exportación creada con éxito' });
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const { lote_id, fecha, cantidad, destinatario, precio } = req.body;
  if (!lote_id || !fecha || !cantidad || !destinatario || !precio) {
    res.status(400).send({ message: 'Faltan campos obligatorios' });
  } else {
    Exportacion.update(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
});

router.delete('/:id', (req, res) => {
  Exportacion.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };