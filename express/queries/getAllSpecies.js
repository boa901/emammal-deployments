import pool from '#express/pool';

const getAllSpecies = async (req, res) => {
  const query = `SELECT DISTINCT species
    FROM eda_species
    ORDER BY species`;
  const results = await pool.query(query);
  res.status(200).json(results);
};

export default getAllSpecies;
