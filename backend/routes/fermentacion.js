const express = require('express');
const router = express.Router();
const Fermentacion = require('../models/fermentacion');

router.get('/', (req, res) => {
  Fermentacion.getAll((err, fermentaciones) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(fermentaciones);
    }
  });
});

router.get('/:id', (req, res) => {
  Fermentacion.getById(req.params.id, (err, fermentacion) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(fermentacion);
    }
  });
});

router.post('/', (req, res) => {
  const { lote_id, fecha_inicio, fecha_fin, tipo } = req.body;
  if (!lote_id || !fecha_inicio || !fecha_fin || !tipo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Fermentacion.create({ lote_id, fecha_inicio, fecha_fin, tipo }, (err, result) => {
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
  const { lote_id, fecha_inicio, fecha_fin, tipo } = req.body;
  if (!lote_id || !fecha_inicio || !fecha_fin || !tipo) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Fermentacion.update(id, { lote_id, fecha_inicio, fecha_fin, tipo }, (err, result) => {
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
  Fermentacion.delete(id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };