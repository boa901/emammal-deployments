import pool from '#express/pool';

const getAllDeployments = async (req, res) => {
  let query = `SELECT a.nid, a.sub_project, a.label, a.latitude, a.longitude, a.camera_name
    FROM deployments a`;
  const values = [];
  if (req.query.species && JSON.parse(req.query.species).length > 0) {
    query += `\nJOIN eda_deployments b ON a.nid = b.nid
      JOIN eda_species c ON b.pid = c.pid AND c.species IN (?)`;
    const species = JSON.parse(req.query.species).map((animal) => animal.value);
    values.push(species);
  }
  if (req.query.projects && JSON.parse(req.query.projects).length > 0) {
    query += `\nJOIN sub_projects d ON a.sub_project = d.nid
      JOIN projects e ON d.project_nid = e.nid AND e.nid IN (?)`;
    const projects = JSON.parse(req.query.projects).map((project) => project.value);
    values.push(projects);
  }
  query += '\nWHERE a.label IS NOT NULL AND a.latitude IS NOT NULL AND a.longitude IS NOT NULL';
  if (req.query.maxLat && req.query.minLat && req.query.maxLng && req.query.minLng) {
    query += '\n  AND a.latitude BETWEEN ? AND ? AND a.longitude BETWEEN ? AND ?';
    values.push(req.query.minLat);
    values.push(req.query.maxLat);
    values.push(req.query.minLng);
    values.push(req.query.maxLng);
  }
  const results = await pool.query(query, values);
  res.status(200).json(results);
};

export default getAllDeployments;
