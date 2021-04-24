const router = require('express').Router();
const dir = require('./dir/dir.route');

// routes registration
router.use('/dir', dir);

module.exports = router;