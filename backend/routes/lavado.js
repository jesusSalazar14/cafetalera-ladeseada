const express = require('express');
const router = express.Router();
const Lavado = require('../models/lavado');

router.get('/', (req, res) => {
  Lavado.getAll((err, lavados) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(lavados);
    }
  });
});

router.get('/:id', (req, res) => {
  Lavado.getById(req.params.id, (err, lavado) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(lavado);
    }
  });
});

router.post('/', (req, res) => {
  const { lote_id, fecha, metodo } = req.body;
  if (!lote_id || !fecha || !metodo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Lavado.create({ lote_id, fecha, metodo }, (err, result) => {
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
  const { lote_id, fecha, metodo } = req.body;
  if (!lote_id || !fecha || !metodo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Lavado.update(id, { lote_id, fecha, metodo }, (err, result) => {
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
  Lavado.delete(id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };