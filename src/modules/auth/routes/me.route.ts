import authenticateMiddleware from '@app/core/middlewares/authenticate.middleware';
import { createRouter } from '@app/core/routing';
import controller from '@modules/auth/controllers/auth.controller';

const router = createRouter([
  {
    path: '/me',
    method: 'get',
    middlewares: [authenticateMiddleware],
    controller: controller.me
  }
]);

export default router;
