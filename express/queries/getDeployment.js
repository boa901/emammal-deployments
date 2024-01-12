import pool from '#express/pool';

const getDeployment = async (req, res) => {
  const query = `SELECT s.species, cn.name, s.count, a.nid
    FROM eda_species s
      LEFT JOIN common_name cn on s.species = cn.species
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
