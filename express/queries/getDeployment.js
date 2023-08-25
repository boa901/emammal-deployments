import pool from '#express/pool';

const getDeployment = async (req, res) => {
  const query = `SELECT s.species, s.count, a.nid
    FROM eda_species s
      JOIN (
        SELECT pid, nid
        FROM eda_deployments
        WHERE nid = ?
      ) a on s.pid = a.pid
    WHERE s.visible=1`;
  const results = await pool.query(query, [req.params.id]);
  res.status(200).json(results);
};

export default getDeployment;
