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

const run = async () => {
    const spinner = (0, _ora2.default)();

    spinner.start('Saving stash');
    const status = await (0, _promise2.default)().status();
    const currentBranch = status.current;

    if (!currentBranch.match(_utils.issueBranchPattern)) {
        return spinner.fail('Invalid operation. You are not on a issue branch');
    }

    let stashName;
    if (status.files.length > 0) {
        stashName = `${currentBranch.match(_utils.issueBranchPattern)[0]}-WIP`;
        await (0, _promise2.default)().stash(['save', '--include-untracked', stashName]);
        spinner.succeed('Stash saved');
    }

    spinner.start(`Updating ${_config2.default.mainBranch}`);
    await (0, _promise2.default)().checkout(_config2.default.mainBranch);
    await (0, _promise2.default)().pull();

    spinner.succeed(`${_config2.default.mainBranch} updated`).start(`Rebasing ${_config2.default.mainBranch}`);
    await (0, _promise2.default)().checkout(currentBranch);

    try {
        await (0, _promise2.default)().silent(true).rebase([_config2.default.mainBranch]);
    } catch (error) {
        const conflictStatus = await (0, _promise2.default)().status();
        return spinner.warn('CONFLICT: Resolve all conflicts manually and continue rebase, conflicts:\n' + conflictStatus.conflicted.map(path => `  - ${path}`).join('\n'));
    }

    spinner.succeed(`${_config2.default.mainBranch} rebased`);

    if (stashName) {
        spinner.start('Reapplying stash');
        let rawStashes = await (0, _promise2.default)().stash(['list']);
        const stashIndex = rawStashes.split('\n').map(stash => {
            const nameRegexp = /.*:(.*)$/;

            let name = '';
            if (stash.match(nameRegexp)) {
                name = stash.match(nameRegexp)[1].trim();
            }

            return name;
        }).findIndex(name => name === stashName);

        await (0, _promise2.default)().stash(['apply', `stash@{${stashIndex}}`]);
        await (0, _promise2.default)().stash(['drop', `stash@{${stashIndex}}`]);
        spinner.succeed('Stash reapplied');
    }
};

run().catch(e => console.error(e));