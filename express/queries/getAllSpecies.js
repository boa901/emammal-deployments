import pool from '#express/pool';

const getAllSpecies = async (req, res) => {
  let query = `SELECT DISTINCT a.species
    FROM eda_species a`;
  const values = [];
  if (req.query.maxLat && req.query.minLat && req.query.maxLng && req.query.minLng) {
    query += `\nJOIN eda_deployments b ON a.pid = b.pid
      JOIN deployments c ON b.nid = c.nid AND c.latitude BETWEEN ? AND ? AND c.longitude BETWEEN ? AND ?`;
    values.push(req.query.minLat);
    values.push(req.query.maxLat);
    values.push(req.query.minLng);
    values.push(req.query.maxLng);
  }
  query += `\nWHERE a.visible=1
    ORDER BY a.species`;
  const results = await pool.query(query, values);
  res.status(200).json(results);
};

export default getAllSpecies;
