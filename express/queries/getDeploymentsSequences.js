import pool from '#express/pool';

const getDeploymentsSequences = async (req, res) => {
  const deployments = req.body;
  if (deployments.length > 0) {
    const values = [];
    let query = `SELECT
      s.project_id,
      s.deployment_id,
      s.sequence_id,
      s.is_blank,
      s.identified_by,
      s.wi_taxon_id,
      s.class,
      s.order,
      s.family,
      s.genus,
      s.species,
      s.common_name,
      s.uncertainty,
      s.start_time,
      s.end_time,
      s.group_size,
      s.age,
      s.sex,
      s.animal_recognizable,
      s.individual_id,
      s.individual_animal_notes,
      s.behavior,
      s.highlighted,
      s.markings,
      s.cv_confidence,
      s.license
    FROM sidora_sequences s
    LEFT JOIN eda_deployments d on s.deployment_id = concat(d.ctLabel, '_', d.cameraCiteinfo)`;
    if (req.query.species && JSON.parse(req.query.species).length > 0) {
      query += '\nJOIN common_name c on s.common_name = c.name AND c.species in (?)';
      values.push(JSON.parse(req.query.species));
    }
    if (req.query.projects && JSON.parse(req.query.projects).length > 0) {
      query += '\nJOIN projects p on s.project_id = p.em_id and p.nid in (?)';
      values.push(JSON.parse(req.query.projects));
    }
    query += '\nWHERE d.nid IN (?)';
    values.push(deployments);
    const results = await pool.query(query, values);
    res.status(200).json(results);
  } else {
    res.status(200).json([]);
  }
};

export default getDeploymentsSequences;
