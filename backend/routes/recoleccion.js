// routes/recoleccion.js
const express = require('express');
const router = express.Router();
const Recoleccion = require('../models/recoleccion');

router.get('/', (req, res) => {
  Recoleccion.find((err, recolecciones) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(recolecciones);
    }
  });
});

router.get('/:id', (req, res) => {
  Recoleccion.getById(req.params.id, (err, recoleccion) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(recoleccion);
    }
  });
});

router.post('/', (req, res) => {
  Recoleccion.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  Recoleccion.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  Recoleccion.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };