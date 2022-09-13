import express, { RequestHandler, Router } from "express";
import { Module } from "./modules";

export type App = {
  name: string;
  middlewares?: RequestHandler[],
  basePath?: string,
  routers?: Router[],
  modules?: Module[]
}

export let APPLICATION: any = null;

export const createApp = (config: App) => {
  const app = express();
  if (config.middlewares?.length) {
    app.use(...config.middlewares);
  }
  if (config.routers?.length) {
    app.use(...config.routers);
  }
  if (config.modules?.length) {
    config.modules.forEach(module => {
      if (module.routers?.length) {
        app.use(...module.routers);
      }
    })
  }
  return app;
}