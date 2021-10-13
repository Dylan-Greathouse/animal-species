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
  }

  static async selectId(id) {
    const { rows } = await pool.query(
        `SELECT * FROM animals WHERE id = $1`,
        [id]
     
      );
      return new Animals(rows[0]);
  };

  static async selectAllAnimals() {
    const { rows } = await pool.query(
        `SELECT *
        FROM animals 
        LEFT JOIN species 
        ON animals.species_id = species.id`
      );
      return rows;
  };

  static async updateAnimal({ animal, speciesId }) {
    const { rows } = await pool.query(
        `UPDATE animals
        SET
        animal=$1, 
        species_id=$2 
        RETURNING *`,
        [animal, speciesId]
      );
      return new Animals(rows[0]);
  };

  static async deleteAnimal(id) {
    const { rows } = await pool.query(
      `DELETE FROM animals WHERE id = $1`, [id]
    );
    return rows[0];
  }

  static async countAnimals() {
    const  { rows } = await pool.query(
      `SELECT species.species, COUNT(animals.id)
      FROM animals
      INNER JOIN species
      ON animals.species_id = species.id
      GROUP BY species.id
      ORDER BY count;
      `)

    return rows;

  }
};

