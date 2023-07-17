import express from 'express';

import getAllDeployments from '#express/queries/getAllDeployments';

const router = express.Router();

router.get('/', getAllDeployments);

export default router;
