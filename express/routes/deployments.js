import express from 'express';

import getDeployment from '#express/queries/getDeployment';
import getDeploymentsCsv from '#express/queries/getDeploymentsCsv';
import getAllDeployments from '#express/queries/getAllDeployments';

const router = express.Router();

router.get('/:id', getDeployment);
router.post('/csv', getDeploymentsCsv);
router.get('/', getAllDeployments);

export default router;
