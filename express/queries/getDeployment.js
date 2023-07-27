import pool from '#express/pool';

const getDeployment = async (req, res) => {
  const query = `SELECT s.species, s.count, a.nid
    FROM eda_species_drupal s
      JOIN (
        SELECT pid, nid
        FROM eda_deployments_drupal
        WHERE nid = $1
      ) a on s.pid = a.pid`;
  const results = await pool.query({
    rowMode: 'json',
    text: query,
    values: [req.params.id],
  });
  res.status(200).json(results.rows);
};

export default getDeployment;
