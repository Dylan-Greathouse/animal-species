const pool = require('../utils/pool');


module.exports = class Animals {
  id;
  animal;
  speciesId;

  constructor (row) {
    this.id = row.id;
    this.animal = row.animal;
    this.speciesId = row.species_id;
  }

  static async insert({ animal, speciesId }) {
    const { rows } = await pool.query(
        `INSERT INTO animals (animal, species_id)
          VALUES( $1, $2)
          RETURNING *`,
        [animal, speciesId]
      );
      return new Animals(rows[0]);
  };
}
