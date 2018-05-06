#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async issueTag => {
  const spinner = (0, _ora2.default)();

  const branch = !issueTag ? await (0, _utils.requestBranch)() : await (0, _utils.searchIssueTagBranch)(issueTag);

  if (!branch) {
    return spinner.fail('Branch not found');
  }

  await (0, _promise2.default)().checkout(branch);
  spinner.succeed('Moved to branch');
};

// eslint-disable-next-line no-console
run(process.argv[2]).catch(e => console.error(e));