import pool from '#express/pool';

const getProjectDeployments = async (req, res) => {
  const query = `SELECT nid, label, latitude, longitude
    FROM deployments_drupal
    WHERE sub_project IN (
      SELECT nid
      FROM sub_projects_drupal
      WHERE project_nid = $1
    ) AND latitude IS NOT NULL AND longitude IS NOT NULL
    ORDER BY latitude`;
  const results = await pool.query({
    rowMode: 'json',
    text: query,
    values: [req.params.id],
  });
  res.status(200).json(results.rows);
};

export default getProjectDeployments;
