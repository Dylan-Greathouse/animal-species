const pool = require('../utils/pool.js');

module.exports = class Specie {
  id;
  species;
  extinct;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
    this.extinct = row.extinct;
  }

  static async insert(specie) {
    const { species, extinct } = specie;

    const { rows } = await pool.query(
      'INSERT INTO species (species, extinct) VALUES ($1, $2) RETURNING *',
      [species, extinct]
    );

    return new Specie(rows[0]);
  }

  static async select() {
    const { rows } = await pool.query('SELECT * FROM species');
    return rows.map((row) => new Specie(row));
  }
};
