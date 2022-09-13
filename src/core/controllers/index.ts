import { RequestHandler } from "express";

export function wrapController(handler: RequestHandler): RequestHandler {
  return async function(req, res, next) {
    try {
      return await handler.call(this, req, res, next);
    } catch (e) {
      next(e);
      // res.send({message: e.message}).sendStatus(400)
    }
  };
}