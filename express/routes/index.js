import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default router;
