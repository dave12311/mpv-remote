const router = require('express').Router();
import dir from './dir/dir.route';
import mpv from './mpv/mpv.route';

// routes registration
router.use('/dir', dir);
router.use('/mpv', mpv);

export default router;