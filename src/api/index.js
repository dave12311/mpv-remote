const router = require('express').Router();
const dir = require('./dir/dir.route');
const open = require('./open/open.route');

// routes registration
router.use('/dir', dir);
router.use('/open', open);

module.exports = router;