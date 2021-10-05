const pool = require('../utils/pool.js');


module.exports = class Specie {
    id;
    species_name;
    extinct;

    constructor(row) {
        this.id = row.id;
        this.species_name = row.species_name;
        this.extinct = row.extinct;
    }

    static async insert(specie) {
        const { species_name, extinct } = specie;

        const { rows } = await pool.query(
            'INSERT INTO species (species_name, extinct) VALUES ($1, $2) RETURNING *', [species_name, extinct]
        );

        return new Specie(rows[0]);
    }
}