import express, { urlencoded } from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import firebaseConfig from './config/firebaseConfig.js';

import boxerRoutes from './routes/boxerRoutes.js';
import clubRoutes from './routes/clubRouter.js';
import connectDB from './config/dbConnection.js';
import globalErrorHandler from './controllers/errorController.js';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/boxers', boxerRoutes);
app.use('/clubs', clubRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(colors.cyan.italic(`Server is running on port ${PORT}`));
  connectDB();
  firebaseConfig;
});
