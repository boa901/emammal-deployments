import pool from '#express/pool';

const getAllDeployments = async (req, res) => {
  const query = `SELECT id, project_id, label, latitude, longitude, camera_name
    FROM deployments
    WHERE label IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL;`;
  const results = await pool.query(query);
  res.status(200).json(results.rows);
};

export default getAllDeployments;
