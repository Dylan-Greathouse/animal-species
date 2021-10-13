const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');


async function saveSpecies() {
  const testSpecies = [
    {
      name: 'Feline',
      extinct: false,
    },
    {
      name: 'Canis lupus',
      extinct: false,
    },
    {
      name: 'Ursidae',
      extinct: false,
    }
  ];
  await Promise.all(
    testSpecies.map(async (species) => {
      await request(app).post('/api/species').send(species);
    })
  );
}
  
async function saveAnimals() {
  const testAnimals = [
    {
      animal: 'Latte',
      speciesId: '1'
    },
    {
      animal: 'Wolf',
      speciesId: '2'
    },
    {
      animal: 'Bear',
      speciesId: '3'
    }
  ];
  await Promise.all(
    testAnimals.map(async (animals) => {
      await request(app).post('/api/animals').send(animals);
    })
  );
}

describe('animal table routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('posts new animal to table', async () => {
    await saveSpecies();
    return request(app)
      .post('/api/animals')
      .send({
        animal: 'Cat',
        speciesId: '1'
      }
      ).then(res =>
      {
        expect(res.body).toEqual({
          id: '2',
          animal: 'Cat',
          speciesId: '1'
        });
      });
  });

  it('Get an animal from table animals by ID', async () => {
    await saveSpecies();
    await saveAnimals();
    return request(app)
      .get('/api/animals/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          animal: 'Latte',
          speciesId: '1'
        });
      });
  });

  it('Gets all animals and their species', async() => {
    await saveSpecies();
    await saveAnimals();
    return request(app)
      .get('/api/animals')
      .then(res => {
        expect(res.body).toEqual([{
          id: expect.any(String),
          animal: expect.any(String),
          extinct: expect.any(Boolean),
          species: expect.any(String),
          species_id: expect.any(String)
        },
        {
          id: expect.any(String),
          animal: expect.any(String),
          extinct: expect.any(Boolean),
          species: expect.any(String),
          species_id: expect.any(String)
        }]);
      });
  });

  it('Updates an animal from the animals table', async() => {
    await saveSpecies();
    await saveAnimals();
    return request(app)
      .patch('/api/animals/1')
      .send({
        animal: 'Cat',
        speciesId: '1'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          animal: 'Cat',
          speciesId: '1'
        });
      });
      
  });

  afterAll(() => {
    pool.end();
  });
});
