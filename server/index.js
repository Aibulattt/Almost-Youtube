const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const cors = require('./middleware/corsMiddleware');

const app = express();
const PORT = process.env.PORT || config.get('port');

app.use(cors);
app.use(express.json({
    extended: true
}))
app.use('/api/auth/', require(path.resolve(__dirname, 'routes', 'auth.routes')))
app.use('/api/favourites', require(path.resolve(__dirname, 'routes', 'favouritesQuery.routes')));


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`app has been started on http://localhost:${PORT}`));
    } catch (error) {
        console.log('Server error ', error.message);
        process.exit(1);
    }
}

start();