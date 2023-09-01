import pool from '#express/pool';

const getDeploymentsCsv = async (req, res) => {
  const deployments = req.body;
  const query = `SELECT *
    FROM deployments_metadata
    WHERE nid IN (?)`;
  const values = [deployments];
  const results = await pool.query(query, values);
  res.status(200).json(results);
};

export default getDeploymentsCsv;
