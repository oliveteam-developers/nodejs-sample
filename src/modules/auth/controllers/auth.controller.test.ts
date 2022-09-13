import SQLite from '@app/configs/sqlite.config';
import mockApi from '@app/mocks/api.mock';
import userController from './auth.controller';

let req: any;
let res: any;

beforeAll(async () => {
  await SQLite.instance.setup();
});

afterAll(() => {
  SQLite.instance.destroy();
});

describe('Testing user controller', () => {
  beforeEach(() => {
    req = mockApi.mockRequest();
    res = mockApi.mockResponse();
  });

  afterEach(() => {
    req = null;
    res = null;
  });

  test('Create user', async () => {
    req.body = {
      email: 'admin@gmail.com',
      password: 'password',
      firstName: 'First',
      lastName: 'Last',
    }
    await userController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  test('Create duplicated user', async () => {
    req.body = {
      email: 'admin@gmail.com',
      password: 'password',
      firstName: 'First',
      lastName: 'Last',
    }
    await userController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
  });

  test('Create incorrect user', async () => {
    await userController.register(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('User login', async () => {
    req.body = {
      email: 'admin@gmail.com',
      password: 'password',
    }
    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('User login with wrong data', async () => {
    req.body = {
      email: 'fake@gmail.com',
      password: 'password',
    }
    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('User login with empty data', async () => {
    req.body = null;
    await userController.login(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Get current user', async () => {
    req.user = {
      id: 1,
    }
    await userController.me(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
