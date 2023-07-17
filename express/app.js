import express from 'express';

import indexRouter from '#express/routes/index';
import deploymentsRouter from '#express/routes/deployments';
import projectsRouter from '#express/routes/projects';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/deployments', deploymentsRouter);
app.use('/projects', projectsRouter);

export default app;
