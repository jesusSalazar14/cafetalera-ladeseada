const express = require('express');
const router = express.Router();
const usuarioModel = require('../models/usuarios');

router.post('/', (req, res) => {
  const { nombre, correo, clave, username } = req.body;

  if (!nombre || !correo || !clave || !username) {
    return res.status(400).send({ mensaje: 'Faltan datos para crear el usuario' });
  }

  usuarioModel.create({ nombre, correo, clave, username }, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send({ mensaje: 'Usuario creado con éxito' });
    }
  });
});

module.exports = { router };