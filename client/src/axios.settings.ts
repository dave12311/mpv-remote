import axios from 'axios';

const host: string = ((process.env === 'dev') ? 'http://localhost:8080' : location.origin) + '/api';

export default host;