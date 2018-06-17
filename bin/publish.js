#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _opn = require('opn');

var _opn2 = _interopRequireDefault(_opn);

var _utils = require('./utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async (issueTag, options) => {
  const spinner = (0, _ora2.default)();

  const branch = issueTag ? await (0, _utils.searchIssueTagBranch)(issueTag) : (await (0, _promise2.default)().status()).current;

  if (!branch) {
    return spinner.fail('You must provide a valid branch');
  }

  if (!branch.match(_utils.issueBranchPattern)) {
    return spinner.fail('Invalid operation. You are not on a issue branch');
  }

  spinner.start('Publishing');

  try {
    await (0, _promise2.default)().silent(true).push(_config2.default.remote, branch, { '--set-upstream': null });
    spinner.succeed('Published');
  } catch (error) {
    spinner.info('Another version of branch already published');
    const publish = (await _inquirer2.default.prompt([{
      name: 'publish',
      message: 'Do you want force update publication? (y or n)',
      validate: answer => ['y', 'n'].includes(answer.toLowerCase())
    }]))['publish'];

    if (publish === 'y') {
      await (0, _promise2.default)().silent(true).push(_config2.default.remote, branch, { '--set-upstream': null, '--force': null });
      spinner.succeed('Published');
    } else {
      return spinner.fail("Won't publish branch, another version already published");
    }
  }

  if (!options.find(word => word === '--no-pr')) {
    (0, _opn2.default)((await (0, _utils.githubLink)(branch)), { wait: false });
  }
};

const words = process.argv.slice(2);

const options = words.filter(word => word.startsWith('--'));
const message = words.filter(word => !word.startsWith('--'));

// eslint-disable-next-line no-console
run(message.shift(), options).catch(e => console.error(e));