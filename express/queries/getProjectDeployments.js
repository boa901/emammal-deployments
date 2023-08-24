import pool from '#express/pool';

const getProjectDeployments = async (req, res) => {
  let query = `SELECT DISTINCT a.nid, a.label, a.latitude, a.longitude
  FROM deployments a`;
  const values = [];
  if (req.query.species && req.query.species.length > 0) {
    query += `\nJOIN eda_deployments b ON a.nid = b.nid
      JOIN eda_species c ON b.pid = c.pid AND c.species IN (?)`;
    const species = JSON.parse(req.query.species);
    values.push(species);
  }
  query += `\nWHERE sub_project IN (
    SELECT nid
    FROM sub_projects
    WHERE project_nid = ?
  ) AND latitude IS NOT NULL AND longitude IS NOT NULL
  ORDER BY a.nid`;
  values.push(req.params.id);
  const results = await pool.query(query, values);
  res.status(200).json(results);
};

export default getProjectDeployments;
