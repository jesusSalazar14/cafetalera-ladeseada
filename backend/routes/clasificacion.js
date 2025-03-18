const express = require('express');
const router = express.Router();
const Clasificacion = require('../models/clasificacion');

router.get('/', (req, res) => {
  Clasificacion.getAll((err, clasificaciones) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(clasificaciones);
    }
  });
});

router.get('/:id', (req, res) => {
  Clasificacion.getById(req.params.id, (err, clasificacion) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(clasificacion);
    }
  });
});

router.post('/', (req, res) => {
  const { lote_id, fecha, calidad } = req.body;
  if (!lote_id || !fecha || !calidad) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Clasificacion.create({ lote_id, fecha, calidad }, (err, result) => {
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
  const { lote_id, fecha, calidad } = req.body;
  if (!lote_id || !fecha || !calidad) {
    res.status(400).send({ mensaje: 'Faltan campos obligatorios' });
  } else {
    Clasificacion.update(id, { lote_id, fecha, calidad }, (err, result) => {
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
  Clasificacion.delete(id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };