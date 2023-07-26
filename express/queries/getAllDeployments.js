import pool from '#express/pool';

const getAllDeployments = async (req, res) => {
  const query = `SELECT nid, sub_project, label, latitude, longitude, camera_name
    FROM deployments_drupal
    WHERE label IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL;`;
  const results = await pool.query(query);
  res.status(200).json(results.rows);
};

export default getAllDeployments;
