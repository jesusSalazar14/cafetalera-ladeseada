const express = require('express');
const router = express.Router();
const Lote = require('../models/lote');

router.get('/', (req, res) => {
  Lote.find((err, lotes) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(lotes);
    }
  });
});

router.get('/:id', (req, res) => {
  Lote.getById(req.params.id, (err, lote) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(lote);
    }
  });
});

router.post('/', (req, res) => {
  const { fecha_inicio, fecha_fin, kilogramos_cereza, metodo } = req.body;
  if (!fecha_inicio || !fecha_fin || !kilogramos_cereza || !metodo) {
    res.status(400).send({ message: 'Faltan campos obligatorios' });
  } else {
    Lote.create(req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(201).send(result);
      }
    });
  }
});

router.put('/:id', (req, res) => {
  const { fecha_inicio, fecha_fin, kilogramos_cereza, metodo } = req.body;
  if (!fecha_inicio || !fecha_fin || !kilogramos_cereza || !metodo) {
    res.status(400).send({ message: 'Faltan campos obligatorios' });
  } else {
    Lote.update(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
});

router.delete('/:id', (req, res) => {
  Lote.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };