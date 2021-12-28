const router = require('express').Router();
const dir = require('./dir/dir.route');
const mpv = require('./mpv/mpv.route');

// routes registration
router.use('/dir', dir);
router.use('/mpv', mpv);

module.exports = router;
