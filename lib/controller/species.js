const { Router } = require('express');
const Specie = require('../models/Specie.js');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const addSpecies = await Specie.insert(req.body);
      res.json(addSpecies);
    } catch (err) {
      next(err);
    }
  });
