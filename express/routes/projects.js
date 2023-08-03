import express from 'express';

import getProjectSpecies from '#express/queries/getProjectSpecies';
import getProjectDeployments from '#express/queries/getProjectDeployments';
import getAllProjects from '#express/queries/getAllProjects';

const router = express.Router();

router.get('/:id/species', getProjectSpecies);
router.get('/:id', getProjectDeployments);
router.get('/', getAllProjects);

export default router;
