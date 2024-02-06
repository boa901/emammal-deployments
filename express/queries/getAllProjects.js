import pool from '#express/pool';

const getAllProjects = async (req, res) => {
  let query = `SELECT DISTINCT a.nid, a.name, a.latitude, a.longitude
    FROM projects a
      JOIN sub_projects b ON a.nid = b.project_nid
      JOIN deployments c ON b.nid = c.sub_project
      JOIN eda_deployments d ON c.nid = d.nid
      JOIN eda_species e ON d.pid = e.pid
    WHERE a.visible = TRUE`;
  const values = [];
  if (req.query.species && JSON.parse(req.query.species).length > 0) {
    query += '\nAND e.species IN (?)';
    values.push(JSON.parse(req.query.species));
  }
  if (req.query.maxLat && req.query.minLat && req.query.maxLng && req.query.minLng) {
    query += '\nAND c.latitude BETWEEN ? AND ? AND c.longitude BETWEEN ? AND ?';
    values.push(req.query.minLat);
    values.push(req.query.maxLat);
    values.push(req.query.minLng);
    values.push(req.query.maxLng);
  }
  query += '\nORDER BY a.name';
  const results = await pool.query(query, values);
  res.status(200).json(results);
};

export default getAllProjects;
