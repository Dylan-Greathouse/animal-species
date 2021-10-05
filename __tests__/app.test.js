const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('post new species to table', () => {
    return request(app)
      .post('/api/species')
      .send({
        id: '2',
        species_name: 'Feline',
        extinct: false
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          species_name: expect.any(String),
          extinct: false
        });
      });
  });

  afterAll(() => {
    pool.end();
  });
});
