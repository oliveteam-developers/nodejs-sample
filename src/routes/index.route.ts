import * as express from 'express';

import defaultRouter from './default/default.route';
import auth from '@app/modules/auth';

const router = express.Router();

router.use('/', defaultRouter);
router.use('/auth', ...auth.routers);
// router.use('/me', meRouter);
// router.use('/user', userRouter);

export default router;
