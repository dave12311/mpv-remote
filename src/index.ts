import app from './app';
import logger from './log';

let port = 8080;

if (process.env.PORT != undefined) {
	port = parseInt(process.env.PORT, 10);
}

app.listen(port, () => {
	logger.info(`Server running at port http://localhost:${port}`);
});
