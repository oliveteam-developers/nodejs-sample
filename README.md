# NodeJS Boilerplate

*(ExpressJS, Typescript, TypeORM, MySQL)*

#### Reference blogs:

- [NodeJS Boilerplate (Express, Typescript, TypeORM, MySQL)
](https://blogs.olive-team.dev/nodejs-boilerplate-express-typescript-typeorm-mysql/)
- [Testing NodeJS project with Jest](https://blogs.olive-team.dev/testing-nodejs-project-with-jest/)
- [Build NodeJS project with Docker](https://blogs.olive-team.dev/build-nodejs-project-with-docker/)

## 1. Manually

### Stable environment

1. Node version: ```14.0.0```
2. Yarn version: ```1.22.4```
3. NPM version: ```6.14.5```
4. MySQL version: ```8.0.21```

#### 1.1. Setup
i. Install packages

```$ yarn``` or ```$ yarn install```

ii. Create .env file in the root folder and update some variables
```
NODE_ENV=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
TOKEN_SECRET_KEY=
```

#### 1.2. Running
```$ yarn dev``` or ```$ npm run dev```

## 2. Docker
#### 2.1. Setup
i. Install packages

```$ yarn``` or ```$ yarn install```

ii. Create .env file in the root folder and update some variables
```
NODE_ENV=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
PORT=
TOKEN_SECRET_KEY=

# Docker
DOCKER_APP_NAME=
DOCKER_MYSQL_PORT=
DOCKER_MYSQL_PORTS=
DOCKER_MYSQL_DB_NAME=
DOCKER_MYSQL_ROOT_PASSWORD=
DOCKER_MYSQL_USER=
DOCKER_MYSQL_PASSWORD=
DOCKER_APP_PATH=
DOCKER_NODE_PORTS=
```
#### 2.2. Running
```$ yarn docker:up``` or ```$ npm run docker:up```
