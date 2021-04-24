// noinspection JSCheckFunctionSignatures

const express = require('express');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const { notFound, errorHandler } = require('./middlewares/errors.middleware');

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/public'));
    app.use('/api/v1', api);
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
    });
} else {
    app.use('/api/v1', api);
}

app.use(notFound);
app.use(errorHandler);

module.exports = app;