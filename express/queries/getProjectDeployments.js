import pool from '#express/pool';

const getProjectDeployments = async (req, res) => {
  let query = `SELECT nid, label, latitude, longitude
    FROM deployments_drupal
    WHERE sub_project IN (
      SELECT nid
      FROM sub_projects_drupal
      WHERE project_nid = $1
    ) AND latitude IS NOT NULL AND longitude IS NOT NULL
    ORDER BY latitude`;
  const values = [req.params.id];
  if (req.query.species && req.query.species.length > 0) {
    query = `SELECT DISTINCT a.nid, a.label, a.latitude, a.longitude
    FROM deployments_drupal a
      JOIN eda_deployments_drupal b ON a.nid = b.nid
      JOIN eda_species_drupal c ON b.pid = c.pid AND c.species = ANY($2::varchar(255)[])
    WHERE sub_project IN (
      SELECT nid
      FROM sub_projects_drupal
      WHERE project_nid = $1
    ) AND latitude IS NOT NULL AND longitude IS NOT NULL
    ORDER BY a.nid`;
    const species = JSON.parse(req.query.species);
    values.push(species);
  }
  const results = await pool.query({
    rowMode: 'json',
    text: query,
    values,
  });
  res.status(200).json(results.rows);
};

export default getProjectDeployments;
