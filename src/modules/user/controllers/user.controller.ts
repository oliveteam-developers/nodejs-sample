import httpStatusCodes from 'http-status-codes';

// Interfaces
import IController from '@app/core/interfaces/IController';
import {
  ICreateUser,
  ILoginUser,
  IUpdateUser,
  IUserQueryParams,
} from '@app/core/interfaces/user.interface';
import { IDeleteById, IDetailById } from '@app/core/interfaces/common.interface';

// Errors
import { StringError } from '@app/errors/string.error';

// Services
import userService from '@modules/user/services/user.service';

// Utilities
import ApiResponse from '@app/utilities/api-response.utility';
import Encryption from '@app/utilities/encryption.utility';
import ApiUtility from '@app/utilities/api.utility';

// Constants
import constants from '@app/constants';

const create: IController = async (req, res) => {
  try {
    const params: ICreateUser = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    }
    const user = await userService.create(params);
    return ApiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === constants.ERROR_CODE.DUPLICATED || e.code === constants.ERROR_CODE.SQLITE_DUPLICATED) {
      return ApiResponse.error(res, httpStatusCodes.CONFLICT, 'Email already exists.');
    }
    return ApiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  }
};

const detail: IController = async (req, res) => {
  try {
    const params: IDetailById = {
      id: parseInt(req.params.id, 10),
    }
    const data = await userService.detail(params);
    return ApiResponse.result(res, data, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const update: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: parseInt(req.params.id, 10),
    }
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const updateMe: IController = async (req, res) => {
  try {
    const params: IUpdateUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      id: req.user.id,
    }
    await userService.update(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const list: IController = async (req, res) => {
  try {
    const limit = ApiUtility.getQueryParam(req, 'limit');
    const page = ApiUtility.getQueryParam(req, 'page');
    const keyword = ApiUtility.getQueryParam(req, 'keyword');
    const params: IUserQueryParams = { limit, page, keyword };
    const data = await userService.list(params);
    return ApiResponse.result(res, data.response, httpStatusCodes.OK, null, data.pagination);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const remove: IController = async (req, res) => {
  try {
    const params: IDeleteById = {
      id: parseInt(req.params.id, 10),
    }
    await userService.remove(params);
    return ApiResponse.result(res, params, httpStatusCodes.OK);
  } catch (e) {
    ApiResponse.exception(res, e);
  }
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.COOKIE.COOKIE_USER,
    value: await Encryption.generateCookie(constants.COOKIE.KEY_USER_ID, userId.toString()),
  };
};

export default {
  create,
  detail,
  update,
  updateMe,
  list,
  remove,
};
