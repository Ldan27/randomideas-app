const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

const startServer = async () => {
  try {
    await connectDB();
    const app = express();

    // Static folder
    app.use(express.static(path.join(__dirname, 'public')));

    // Body parser middleware
    app.use(express.json()); /** allow us to send raw data to the server */
    app.use(express.urlencoded({ extended: false }));

    // cors middleware
    app.use(
      cors({
        origin: ['http://localhost:5000', 'http://localhost:3000'],
        credentials: true,
      })
    );

    app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the RandomIdeas API' });
    });

    const ideasRouter = require('./routes/ideas');
    app.use('/api/ideas', ideasRouter);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (err) {
    console.error('Faild to start the server:', err);
    process.exit(1);
  }
};
startServer();
