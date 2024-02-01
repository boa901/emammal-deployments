import pool from '#express/pool';

const getAllSpecies = async (req, res) => {
  let query = `SELECT DISTINCT a.species, cn.name
    FROM eda_species a
      LEFT JOIN common_name cn on a.species = cn.species
      JOIN eda_deployments b ON a.pid = b.pid
      JOIN deployments c ON b.nid = c.nid
      JOIN sub_projects d ON c.sub_project = d.nid
      JOIN projects e on d.project_nid = e.nid
    WHERE 1 = 1`;
  const values = [];
  if (req.query.projects && JSON.parse(req.query.projects).length > 0) {
    query += '\nAND e.nid IN (?)';
    values.push(JSON.parse(req.query.projects));
  }
  if (req.query.maxLat && req.query.minLat && req.query.maxLng && req.query.minLng) {
    query += '\nAND c.latitude BETWEEN ? AND ? AND c.longitude BETWEEN ? AND ?';
    values.push(req.query.minLat);
    values.push(req.query.maxLat);
    values.push(req.query.minLng);
    values.push(req.query.maxLng);
  }
  query += `\nAND a.visible=1
    ORDER BY a.species`;
  const results = await pool.query(query, values);
  res.status(200).json(results);
};

export default getAllSpecies;
