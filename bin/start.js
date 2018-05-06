#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _utils = require('./utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async (issueTag, issueName, options) => {
  const spinner = (0, _ora2.default)();

  if (!Number.isInteger(parseInt(issueTag))) {
    return spinner.fail('First parameter (issue tag) must be a number');
  }

  if (await (0, _utils.searchIssueTagBranch)(issueTag)) {
    return spinner.fail('An issue with the same tag already started');
  }

  if (!issueName) {
    return spinner.fail('You must provide an issue name');
  }

  if ((await (0, _promise2.default)().status()).files.length > 0) {
    return spinner.fail('Work in progress save or stash it before starting a new issue');
  }

  if (options.find(word => word === '--from-current' || word === '--fc')) {
    spinner.info('Starting from current branch');
  } else {
    spinner.info(`Starting from ${_config2.default.mainBranch} (provide "--from-current" or "--fc" to start from current branch)`);
    spinner.start(`Updating ${_config2.default.mainBranch}`);
    await (0, _promise2.default)().checkout(_config2.default.mainBranch);
    await (0, _promise2.default)().pull();
    spinner.succeed(`${_config2.default.mainBranch} updated`);
  }

  spinner.start('Creating branch');
  await (0, _promise2.default)().checkoutLocalBranch(`${_config2.default.prefix}${issueTag}${_config2.default.branchSeparator}${issueName}`);
  spinner.succeed('Branch created');
};

const [node, command, ...words] = process.argv;

const options = words.filter(word => word.startsWith('--'));
const message = words.filter(word => !word.startsWith('--'));

run(message.shift(), message.join(_config2.default.branchSeparator).toLowerCase(), options).catch(e => console.error(e));