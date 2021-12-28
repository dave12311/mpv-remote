const listen = require('./app.js');

const port = process.env.PORT || 8080;

listen(port, () => {
    console.log(`Server is up at port http://localhost:${port}`);
});