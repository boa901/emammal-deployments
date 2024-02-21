import pool from '#express/pool';

const getDeploymentsCsv = async (req, res) => {
  const deployments = req.body;
  if (deployments.length > 0) {
    const query = `SELECT
      deployment_id,
      deployment_name,
      actual_date_out,
      retrieval_date,
      CASE
        WHEN fuzzed = FALSE THEN actual_lat
        ELSE NULL
      END as actual_lat,
      CASE
        WHEN fuzzed = FALSE THEN actual_long
        ELSE NULL
      END as actual_long,
      fuzzed,
      project_id,
      project_name,
      sub_project_id,
      sub_project_name,
      plot_name,
      plot_treatment,
      camera_failure_details,
      deployment_notes,
      bait_type,
      bait_description,
      feature,
      feature_type_methodology,
      detection_distance,
      sensitivity_setting,
      camera_id
    FROM deployments_metadata
    WHERE nid IN (?)
    AND actual_lat IS NOT NULL
    AND actual_long IS NOT NULL
    AND deployment_name IS NOT NULL`;
    const values = [deployments];
    const results = await pool.query(query, values);
    res.status(200).json(results);
  } else {
    res.status(200).json([]);
  }
};

export default getDeploymentsCsv;
