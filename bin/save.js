#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async commitMessage => {
    const spinner = (0, _ora2.default)();

    if (commitMessage === '') {
        return spinner.fail('You must provide a commit message');
    }

    const currentBranch = (await (0, _promise2.default)().status()).current;

    if (!currentBranch.match(_utils.issueBranchPattern)) {
        return spinner.fail('Invalid operation. You are not on a issue branch');
    }

    spinner.start('committing');
    const issueTag = currentBranch.match(_utils.issueBranchPattern)[0];
    await (0, _promise2.default)().raw(['commit', '-m', `${issueTag} ${commitMessage}`]);

    spinner.succeed('Commited');
};

const [node, command, ...message] = process.argv;

run(message.join(' ')).catch(e => console.error(e));