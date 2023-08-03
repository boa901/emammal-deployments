import pool from '#express/pool';

const getProjectSpecies = async (req, res) => {
  const query = `SELECT DISTINCT a.species
    FROM eda_species_drupal a
      JOIN eda_deployments_drupal b ON a.pid = b.pid
      JOIN deployments_drupal c ON b.nid = c.nid
      JOIN sub_projects_drupal d ON c.sub_project = d.nid
    WHERE d.project_nid = $1
    `;
  const results = await pool.query({
    rowMode: 'json',
    text: query,
    values: [req.params.id],
  });
  res.status(200).json(results.rows);
};

export default getProjectSpecies;
