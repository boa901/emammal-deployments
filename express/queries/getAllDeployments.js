import pool from '#express/pool';

const getAllDeployments = async (req, res) => {
  let query = `SELECT a.nid, a.sub_project, a.label, a.latitude, a.longitude, a.camera_name
    FROM deployments_drupal a`;
  const values = [];
  let paramCount = 1;
  if (req.query.species && req.query.species.length > 0) {
    query += `\nJOIN eda_deployments_drupal b ON a.nid = b.nid
      JOIN eda_species_drupal c ON b.pid = c.pid AND c.species = ANY($${paramCount++}::varchar(255)[])`;
    const species = JSON.parse(req.query.species);
    values.push(species);
  }
  query += '\nWHERE label IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL';
  if (req.query.maxLat && req.query.minLat && req.query.maxLng && req.query.minLng) {
    query += `\n  AND latitude BETWEEN $${paramCount++} AND $${paramCount++} AND longitude BETWEEN $${paramCount++} AND $${paramCount++}`;
    values.push(req.query.minLat);
    values.push(req.query.maxLat);
    values.push(req.query.minLng);
    values.push(req.query.maxLng);
  }
  const results = await pool.query({
    rowMode: 'json',
    text: query,
    values,
  });
  res.status(200).json(results.rows);
};

export default getAllDeployments;
