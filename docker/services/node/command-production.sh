#!/usr/bin/env bash

yarn install && yarn build && pm2-runtime start dist/index.js