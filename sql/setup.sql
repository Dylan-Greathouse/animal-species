DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS animals;


CREATE TABLE species (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
species TEXT NOT NULL,
extinct BOOLEAN
);

CREATE TABLE animals(
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
animal TEXT NOT NULL,
species_id BIGINT,
FOREIGN KEY (species_id) REFERENCES species(id)
);

INSERT INTO species (species, extinct)
VALUES ('Feline', false)
RETURNING *;

INSERT INTO animals (animal, species_id)
VALUES ('Latte', '1')
RETURNING *;