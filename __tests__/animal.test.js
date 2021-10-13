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
      name: 'Bear',
      extinct: false,
    },
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
      animal: 'Siberian Tiger',
      speciesId: '2'
    },
    {
      animal: 'Polar Bear',
      speciesId: '3'
    },
    {
      animal: 'Arctic Wolf',
      speciesId: '1'
    },
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
      .send().then(res =>
      {
        expect(res.body).toEqual();
      });
  });

  afterAll(() => {
    pool.end();
  });
});
