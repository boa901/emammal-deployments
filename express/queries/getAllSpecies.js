import pool from '#express/pool';

const getAllSpecies = async (req, res) => {
  const query = `SELECT DISTINCT species
    FROM eda_species_drupal`;
  const results = await pool.query(query);
  res.status(200).json(results.rows);
};

export default getAllSpecies;
