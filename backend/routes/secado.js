const express = require('express');
const router = express.Router();
const Secado = require('../models/secado');

router.get('/', (req, res) => {
  Secado.find((err, secados) => {
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
  Secado.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  Secado.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  Secado.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };