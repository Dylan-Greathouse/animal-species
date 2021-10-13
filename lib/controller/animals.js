const { Router } = require('express');
const Animal = require('../models/Animal.js');

module.exports = Router()
  .post('/', async(req, res, next) => {
    try {
      const addAnimals = await Animal.insert(req.body);
      res.json(addAnimals);
    } catch (err) {
      next(err);
    }
  });
