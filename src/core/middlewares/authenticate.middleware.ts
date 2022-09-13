import express from 'express';
import httpStatusCodes from 'http-status-codes';

// Services
import userService from '@modules/user/services/user.service';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '@app/utilities/api-response.utility';
import Encryption from '@app/utilities/encryption.utility';
import ApiUtility from '@app/utilities/api.utility';

// Constants
import constants from '@app/constants';
import { UnAuthenticatedError } from '../errors/unauthenticated.error';
import { ForbiddenError } from '../errors/forbidden.error';

export default async (
  req: IRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (constants.APPLICATION.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
    const authorizationHeader = ApiUtility.getCookieFromRequest(req, constants.COOKIE.COOKIE_USER);
    if (authorizationHeader) {
      const decoded = await Encryption.verifyCookie(authorizationHeader);
      if (decoded) {
        const user = await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] });
        if (user) {
          // @ts-ignore
          Object.defineProperty(req, 'user', {
            get: () => {
              return user;
              // return await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] })
            },
          })
        } else {
          throw new UnAuthenticatedError();
          // return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        }
      } else {
        throw new UnAuthenticatedError();
        // return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      }
    } else {
      throw new ForbiddenError();
      // return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
    }
  }
  next();
};
