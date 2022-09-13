import { Router } from "express"

export type Module = {
  name: string,
  routers: Router[]
}

export const createModule = (module: Module) => module;