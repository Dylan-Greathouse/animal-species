const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');



describe('species table routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('post new species to table', () => {
    return request(app)
      .post('/api/species')
      .send({
        id: '1',
        species: 'Feline',
        extinct: false,
      })
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(String),
          species: expect.any(String),
          extinct: false,
        });
      });
  });

  it('gets all species from table', async () => {
    await request(app).post('/api/species').send(
      {
        species: 'Feline',
        extinct: false,
      }
    
    );

    await request(app).post('/api/species').send(
      {
        species: 'Canis lupus',
        extinct: false,
      }
    
    );
    const res = await request(app)
      .get('/api/species');
    expect(res.body).toEqual([
      {
        id: '1',
        species: 'Feline',
        extinct: false
      },
      {
        id: '2',
        species: 'Feline',
        extinct: false
      },
      {
        id: '3',
        species: 'Canis lupus',
        extinct: false
      }
    ]);
  });

  afterAll(() => {
    pool.end();
  });
});
