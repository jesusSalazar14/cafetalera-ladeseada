const express = require('express');
const router = express.Router();
const Secado = require('../models/secado');

router.get('/', (req, res) => {
  Secado.getAll((err, secados) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(secados);
    }
  });
});

router.get('/:id', (req, res) => {
  Secado.getById(req.params.id, (err, secado) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(secado);
    }
  });
});

router.post('/', (req, res) => {
  const { lote_id, fecha_inicio, fecha_fin, metodo } = req.body;
  if (!lote_id || !fecha_inicio || !fecha_fin || !metodo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Secado.create({ lote_id, fecha_inicio, fecha_fin, metodo }, (err, result) => {
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
  const { lote_id, fecha_inicio, fecha_fin, metodo } = req.body;
  if (!lote_id || !fecha_inicio || !fecha_fin || !metodo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Secado.update(id, { lote_id, fecha_inicio, fecha_fin, metodo }, (err, result) => {
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
  Secado.delete(id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };