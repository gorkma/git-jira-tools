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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async issueTag => {
    const spinner = (0, _ora2.default)();

    const branch = issueTag ? await (0, _utils.searchIssueTagBranch)(issueTag) : (await (0, _promise2.default)().status()).current;

    if (!branch) {
        return spinner.fail('You must provide a valid branch');
    }

    if (!branch.match(_utils.issueBranchPattern)) {
        return spinner.fail('Invalid operation. You are not on a issue branch');
    }

    spinner.start('Publishing');
    await (0, _promise2.default)().push(_config2.default.remote, branch, { '--set-upstream': null });
    spinner.succeed('Published');
    (0, _opn2.default)(`https://github.com/workshare/alpaca/compare/${_config2.default.mainBranch}...${branch}?expand=1`, { wait: false });
};

run(process.argv[2]).catch(e => console.error(e));