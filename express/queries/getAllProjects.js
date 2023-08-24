import pool from '#express/pool';

const getAllProjects = async (req, res) => {
  const query = `SELECT nid, name, latitude, longitude
    FROM projects
    ORDER BY name`;
  const results = await pool.query(query);
  res.status(200).json(results);
};

export default getAllProjects;
