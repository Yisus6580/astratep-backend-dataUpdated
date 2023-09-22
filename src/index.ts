import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import afiliateRoutes from './routes/afiliate.route';
import { connect } from './database';

connect();
dotenv.config();

const app = express();

app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors({ origin: '*' }));

app.use('/api/afiliate', afiliateRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server on port', process.env.PORT);
});
