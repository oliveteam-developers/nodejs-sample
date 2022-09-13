import { createRouter } from '@app/core/routing';
import controller from '@modules/auth/controllers/auth.controller';

const router = createRouter([
  {
    path: '/register',
    method: 'post',
    controller: controller.register
  }
])

export default router
