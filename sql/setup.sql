DROP TABLE IF EXISTS species;
-- CREATE TABLE IF EXISTS animals;

CREATE TABLE species (
     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    species_name TEXT NOT NULL,
    extinct BOOLEAN
)

-- CREATE TABLE animals (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     animal_name TEXT NOT NULL,
--     species_id BIGINT FOREIGN KEY REFERENCES species(id) PRIMARY KEY,
--     extinct BOOLEAN
-- )