// routes/fermentacion.js
const express = require('express');
const router = express.Router();
const Fermentacion = require('../models/fermentacion');

router.get('/', (req, res) => {
  Fermentacion.find((err, fermentaciones) => {
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
  Fermentacion.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  Fermentacion.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  Fermentacion.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };