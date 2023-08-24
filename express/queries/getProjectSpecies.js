import pool from '#express/pool';

const getProjectSpecies = async (req, res) => {
  const query = `SELECT a.species, SUM(a.count) count
    FROM eda_species a
      JOIN eda_deployments b ON a.pid = b.pid
      JOIN deployments c ON b.nid = c.nid
      JOIN sub_projects d ON c.sub_project = d.nid
    WHERE d.project_nid = ?
    GROUP BY a.species`;
  const results = await pool.query(query, [req.params.id]);
  res.status(200).json(results);
};

export default getProjectSpecies;
