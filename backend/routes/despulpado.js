const express = require('express');
const router = express.Router();
const Despulpado = require('../models/despulpado');

router.get('/', (req, res) => {
  Despulpado.getAll((err, despulpados) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(despulpados);
    }
  });
});

router.get('/:id', (req, res) => {
  Despulpado.getById(req.params.id, (err, despulpado) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(despulpado);
    }
  });
});

router.post('/', (req, res) => {
  const { lote_id, fecha, tiempo } = req.body;
  if (!lote_id || !fecha || !tiempo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Despulpado.create({ lote_id, fecha, tiempo }, (err, result) => {
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
  const { lote_id, fecha, tiempo } = req.body;
  if (!lote_id || !fecha || !tiempo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Despulpado.update(id, { lote_id, fecha, tiempo }, (err, result) => {
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
  Despulpado.delete(id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };