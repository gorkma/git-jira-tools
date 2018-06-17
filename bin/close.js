#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _utils = require('./utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async issueTag => {
  const spinner = (0, _ora2.default)();

  const branch = !issueTag ? await (0, _utils.requestBranch)() : await (0, _utils.searchIssueTagBranch)(issueTag);

  if (!branch) {
    return spinner.fail('Branch not found');
  }

  spinner.start('Removing remote branch');
  try {
    await (0, _promise2.default)().silent(true).push(_config2.default.remote, `:${branch}`);
    spinner.succeed('Remote branch removed');
  } catch (error) {
    spinner.info(`Remote branch not found, pruning ${_config2.default.remote}`);
    await (0, _promise2.default)().raw(['remote', 'prune', _config2.default.remote]);
  }

  spinner.start('Removing local branch');

  const status = await (0, _promise2.default)().status();
  const currentBranch = status.current;

  if (currentBranch === branch) {
    spinner.info(`Removing current branch, moving to ${_config2.default.mainBranch}`);
    await (0, _promise2.default)().checkout(_config2.default.mainBranch);
  }

  spinner.start('Removing local branch');
  try {
    await (0, _promise2.default)().silent(true).deleteLocalBranch(branch);
    spinner.succeed('Local branch removed');
  } catch (error) {
    spinner.info('Branch not fully merged');
    const remove = (await _inquirer2.default.prompt([{
      name: 'remove',
      message: 'Are you sure you want to close it? (y or n)',
      validate: answer => ['y', 'n'].includes(answer.toLowerCase())
    }]))['remove'];

    if (remove === 'y') {
      await (0, _promise2.default)().raw(['branch', '-D', branch]);
      spinner.succeed('Local branch removed');
    } else {
      return spinner.fail("Won't remove branch, not fully merged");
    }
  }
};

// eslint-disable-next-line no-console
run(process.argv[2]).catch(e => console.error(e));