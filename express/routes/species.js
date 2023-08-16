import express from 'express';

import getAllSpecies from '#express/queries/getAllSpecies';

const router = express.Router();

router.get('/', getAllSpecies);

export default router;
