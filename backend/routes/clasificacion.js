const express = require('express');
const router = express.Router();
const Clasificacion = require('../models/clasificacion');

router.get('/', (req, res) => {
  Clasificacion.find((err, clasificaciones) => {
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
  Clasificacion.create(req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(result);
    }
  });
});

router.put('/:id', (req, res) => {
  Clasificacion.update(req.params.id, req.body, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.delete('/:id', (req, res) => {
  Clasificacion.delete(req.params.id, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = { router };