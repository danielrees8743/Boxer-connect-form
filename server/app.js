import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';

import boxerRoutes from './routes/boxerRoutes.js';
import clubRoutes from './routes/clubRouter.js';
import connectDB from './db/dbConnection.js';

const PORT = process.env.PORT || 3000;
const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.use('/boxers', boxerRoutes);
app.use('/clubs', clubRoutes);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(colors.cyan.italic(`Server is running on port ${PORT}`));
  connectDB();
});
