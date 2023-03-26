const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors');
const goalsRouter = require('./src/routes/goals');
const usersRouter = require('./src/routes/user');
const { errorHandler } = require('./src/middleware/error');
const connectDB = require('./src/config/db');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/goals', goalsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => res.send('App is running'));

app.use(errorHandler);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
