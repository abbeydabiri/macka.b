import cors from 'cors';
import express from 'express';
import showRoutes from './show.js';
import inventoryRoutes from './inventory.js';

global.memorydb = {"items":{},"solditems":{}}
const app = express();

app.use(cors());
app.options('*', cors())
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb'}));

app.use('/show', showRoutes);
app.use('/inventory', inventoryRoutes);

export default app;
