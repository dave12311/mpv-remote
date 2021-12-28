import cors from 'cors';
import express, { Application } from 'express';

import api from './api';
import logger from './log';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.options('*', cors);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/public'));
} else {
	logger.warn('Running in dev mode');
}

app.use('/api', api);

export default app;
