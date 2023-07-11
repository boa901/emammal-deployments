import express from 'express';

import indexRouter from '#src/routes/index';
import deploymentsRouter from '#src/routes/deployments';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/deployments', deploymentsRouter);

export default app;
