const express = require('express');
const router = express.Router();
const Despulpado = require('../models/despulpado');

router.get('/', (req, res) => {
  Despulpado.find((err, despulpados) => {
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
  Despulpado.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  Despulpado.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  Despulpado.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };