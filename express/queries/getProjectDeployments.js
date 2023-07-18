import pool from '#express/pool';

const getProjectDeployments = async (req, res) => {
  const query = `SELECT id, label, latitude, longitude
    FROM deployments
    WHERE project_id = $1 AND latitude IS NOT NULL AND longitude IS NOT NULL`;
  const results = await pool.query({
    rowMode: 'json',
    text: query,
    values: [req.params.id],
  });
  res.status(200).json(results.rows);
};

export default getProjectDeployments;
