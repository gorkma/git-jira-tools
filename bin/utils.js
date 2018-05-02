'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.issueBranchPattern = exports.searchIssueTagBranch = exports.requestBranch = undefined;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const requestBranch = exports.requestBranch = async () => {
    const branches = await (0, _promise2.default)().branchLocal();
    _readline2.default.emitKeypressEvents(process.stdin);

    const issues = branches.all.filter(branch => branch.startsWith(_config2.default.prefix));

    const ui = new _inquirer2.default.ui.BottomBar();
    process.stdin.on('keypress', (ch, key) => {
        if (key && key.name === 'escape') {
            ui.close();
        }
    });

    const answers = await _inquirer2.default.prompt([{
        name: 'branch',
        type: 'list',
        message: 'Select an issue (press "esc" to cancel):',
        choices: issues
    }]);

    return answers['branch'];
};

const searchIssueTagBranch = exports.searchIssueTagBranch = async issueTag => {
    const branches = await (0, _promise2.default)().branchLocal();

    return branches.all.find(branch => branch.startsWith(`${_config2.default.prefix}${issueTag}`));
};

const issueBranchPattern = exports.issueBranchPattern = `(${_config2.default.prefix}\\d*)`;