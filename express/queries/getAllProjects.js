import pool from '#express/pool';

const getAllProjects = async (req, res) => {
  const query = `SELECT id, project_name, (max_latitude + min_latitude) / 2 as latitude, (max_longitude + min_longitude) / 2 as longitude
    FROM projects;`;
  const results = await pool.query(query);
  res.status(200).json(results.rows);
};

export default getAllProjects;
