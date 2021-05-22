import axios from "axios";
import axiosRetry from "axios-retry";

// noinspection JSIncompatibleTypesComparison
const host = ((process.env === 'dev') ? 'http://localhost:8080' : location.origin) + '/api/v1';

axiosRetry(axios, { retryDelay: axiosRetry.exponentialDelay, retries: 5 });

export { host };
export { default as axios } from "axios";