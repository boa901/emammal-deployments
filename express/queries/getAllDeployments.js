import pool from '#express/pool';

const getAllDeployments = async (req, res) => {
  let query = `SELECT a.nid, a.sub_project, a.label, a.latitude, a.longitude, a.camera_name
    FROM deployments_drupal a`;
  const values = [];
  let paramCount = 1;
  if (req.query.species && JSON.parse(req.query.species).length > 0) {
    query += `\nJOIN eda_deployments_drupal b ON a.nid = b.nid
      JOIN eda_species_drupal c ON b.pid = c.pid AND c.species = ANY($${paramCount++}::varchar(255)[])`;
    const species = JSON.parse(req.query.species);
    values.push(species);
  }
  if (req.query.projects && JSON.parse(req.query.projects).length > 0) {
    query += `\nJOIN sub_projects_drupal d ON a.sub_project = d.nid
      JOIN projects_drupal e ON d.project_nid = e.nid AND e.nid = ANY($${paramCount++}::int[])`;
    const projects = JSON.parse(req.query.projects);
    values.push(projects);
  }
  query += '\nWHERE a.label IS NOT NULL AND a.latitude IS NOT NULL AND a.longitude IS NOT NULL';
  if (req.query.maxLat && req.query.minLat && req.query.maxLng && req.query.minLng) {
    query += `\n  AND a.latitude BETWEEN $${paramCount++} AND $${paramCount++} AND a.longitude BETWEEN $${paramCount++} AND $${paramCount++}`;
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
