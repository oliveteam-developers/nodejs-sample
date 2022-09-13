import httpStatusCodes from 'http-status-codes';

// Services
import authService from '@modules/auth/services/auth.service';

// Utilities
import ApiResponse from '@app/utilities/api-response.utility';
import Encryption from '@app/utilities/encryption.utility';

// Constants
import constants from '@app/constants';
import { LoginSchema } from '../validations/login.schema';
import { validate } from '@app/core/validation';
import IController from '@app/core/interfaces/IController';
import { RegisterSchema } from '../validations/register.schema';
import { EntityError } from '@app/core/errors/entity.error';

const register: IController = async (req, res) => {
  const body = await validate(RegisterSchema.fromObject(req.body))
  const user = await authService.create(body);
  return ApiResponse.result(res, user, httpStatusCodes.OK);
};

const login: IController = async (req, res) => {
  const body = await validate(LoginSchema.fromObject(req.body))
  const user = await authService.login(body);
  const cookie = await generateUserCookie(user.id);
  return ApiResponse.result(res, user, httpStatusCodes.OK, cookie);
};

const me: IController = async (req, res) => {
  const cookie = await generateUserCookie(req.user.id);
  return ApiResponse.result(res, req.user, httpStatusCodes.OK, cookie);
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.COOKIE.COOKIE_USER,
    value: await Encryption.generateCookie(constants.COOKIE.KEY_USER_ID, userId.toString()),
  };
};

export default {
  register,
  login,
  me,
};
