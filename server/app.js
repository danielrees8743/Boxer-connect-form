import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';

import boxerRoutes from './routes/boxerRoutes.js';

dotenv.config({ path: './.config.env' });
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.use('/boxers', boxerRoutes);

app.listen(PORT, () => {
  console.log(colors.cyan.italic(`Server is running on port ${PORT}`));
});
