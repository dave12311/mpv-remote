import { Router } from 'express';
import dir from './dir/dir.route';

const router = Router();

// Routes registration
router.use('/dir', dir);

export default router;
