const express = require('express');
const router = express.Router();
const usuarioModel = require('../models/usuarios');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  const { correo, clave } = req.body;
  usuarioModel.login(correo, clave, (err, token) => {
    if (err) {
      res.status(400).send(err);
    } else if (token === null) {
      res.status(401).send({ mensaje: 'Credenciales incorrectas' });
    } else {
      res.status(200).send({ token });
    }
  });
});

module.exports = router;