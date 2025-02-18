const express = require('express');
const router = express.Router();
const Lavado = require('../models/lavado');

router.get('/', (req, res) => {
  Lavado.find((err, lavados) => {
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
  Lavado.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  Lavado.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  Lavado.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };