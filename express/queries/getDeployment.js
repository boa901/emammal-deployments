import pool from '#express/pool';

const getDeployment = async (req, res) => {
  const speciesQuery = `SELECT s.species, cn.name, s.count, a.nid
    FROM eda_species s
      LEFT JOIN common_name cn on s.species = cn.species
      JOIN (
        SELECT pid, nid
        FROM eda_deployments
        WHERE nid = ?
      ) a on s.pid = a.pid
    WHERE s.visible=1`;
  const species = pool.query(speciesQuery, [req.params.id]);

  const projectQuery = `SELECT p.name, p.nid
    FROM deployments d
      LEFT JOIN sub_projects sp on d.sub_project = sp.nid
      LEFT JOIN projects p on sp.project_nid = p.nid
    WHERE d.nid = ?`;
  const project = pool.query(projectQuery, [req.params.id]);

  Promise.all([species, project]).then((values) => {
    const results = { species: values[0], project: values[1] };
    res.status(200).json(results);
  });
};

export default getDeployment;
