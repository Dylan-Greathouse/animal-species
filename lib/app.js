const express = require('express');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error.js');
const something = require('./controller/species.js');
const animals = require('./controller/animals.js');

const app = express();

app.use(express.json());
app.use('/api/species', something);
app.use('/api/animals', animals);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
