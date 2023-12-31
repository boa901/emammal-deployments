import cors from 'cors';
import express from 'express';

import { nextJSDomain } from '#express/settings';
import indexRouter from '#express/routes/index';
import deploymentsRouter from '#express/routes/deployments';
import projectsRouter from '#express/routes/projects';
import speciesRouter from '#express/routes/species';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: nextJSDomain }));

app.use('/', indexRouter);
app.use('/deployments', deploymentsRouter);
app.use('/projects', projectsRouter);
app.use('/species', speciesRouter);

export default app;
