import { Router } from 'express';

import { authenticate } from './middlewares'

const router = Router();

router.use(authenticate)

// router.use('/auth', ContactRouter);

export default router