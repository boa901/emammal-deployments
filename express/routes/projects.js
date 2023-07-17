import express from 'express';

import getAllProjects from '#express/queries/getAllProjects';

const router = express.Router();

router.get('/', getAllProjects);

export default router;
