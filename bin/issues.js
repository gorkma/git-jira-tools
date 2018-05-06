#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async () => {
  const spinner = (0, _ora2.default)();
  const branches = await (0, _promise2.default)().branchLocal();

  branches.all.filter(branch => branch.startsWith(_config2.default.prefix)).map(branch => spinner.info(branch));
};

// eslint-disable-next-line no-console
run().catch(e => console.error(e));