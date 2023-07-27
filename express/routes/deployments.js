import express from 'express';

import getDeployment from '#express/queries/getDeployment';
import getAllDeployments from '#express/queries/getAllDeployments';

const router = express.Router();

router.get('/:id', getDeployment);
router.get('/', getAllDeployments);

export default router;
