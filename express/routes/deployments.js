import express from 'express';
import pool from '#express/pool';

const router = express.Router();

router.get('/', async (req, res) => {
  const query = 'SELECT * from eda_deployments;';
  const results = await pool.query(query);
  res.status(200).json(results.rows);
});

export default router;
