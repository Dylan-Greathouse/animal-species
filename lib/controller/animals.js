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
  })

  .get('/', async(req, res, next) => {
    try {
      const getAnimals = await Animal.selectAllAnimals();
      res.json(getAnimals);
    } catch (err) {
      next(err);
    }
  })

  .get('/roundup', async(req, res, next) => {
    try {
      const countAnimals = await Animal.countAnimals();
      res.json(countAnimals);
    } catch (err) {
      next(err);
    }
  })

  
  .get('/:id', async(req, res, next) => {
    try {
      const getAnimal = await Animal.selectId(req.params.id);
      res.json(getAnimal);
    } catch (err) {
      next(err);
    }
  })
  

  .patch('/:id', async(req, res, next) => {
    try {
      const changeAnimal = await Animal.updateAnimal(req.body);
      res.json(changeAnimal);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', async(req, res, next) => {
    try {
      const animalGone = await Animal.deleteAnimal(req.params.id);
      res.send(animalGone);
    } catch (err) {
      next(err);
    }
  });

  
