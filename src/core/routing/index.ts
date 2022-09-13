import { Request, RequestHandler, Response, Router, RouterOptions } from "express";
import { wrapController } from "../controllers";

export type Route = {
  name?: string;
  prefix?: string;
  path: string;
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  middlewares?: RequestHandler[],
  controller: RequestHandler,
  children?: Route[]
}

export function createRoutes(router: Router, routes: Route[], parent: Route) {
  routes.forEach(route => {
    const method = router[route.method];
    method.call(router, parent ? `${parent.path}/${route.path}` : route.path, ...(route.middlewares || []), wrapController(route.controller));
    if (route?.children?.length) {
      createRoutes(router, route.children, route);
    }
  });
  return router;
}

export function createRouter(routes: Route[], options?: RouterOptions) {
  const router = Router(options);
  return createRoutes(router, routes, null);
}