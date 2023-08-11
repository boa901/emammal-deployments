import pool from '#express/pool';

const getAllDeployments = async (req, res) => {
  let query = `SELECT nid, sub_project, label, latitude, longitude, camera_name
    FROM deployments_drupal
    WHERE label IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL;`;
  let values = [];
  if (req.query.maxLat && req.query.minLat && req.query.maxLng && req.query.minLng) {
    query = `SELECT nid, sub_project, label, latitude, longitude, camera_name
    FROM deployments_drupal
    WHERE label IS NOT NULL AND latitude IS NOT NULL AND longitude IS NOT NULL
      AND latitude BETWEEN $1 AND $2 AND longitude BETWEEN $3 AND $4;`;
    values = [
      req.query.minLat,
      req.query.maxLat,
      req.query.minLng,
      req.query.maxLng,
    ];
  }
  const results = await pool.query({
    rowMode: 'json',
    text: query,
    values,
  });
  res.status(200).json(results.rows);
};

export default getAllDeployments;
