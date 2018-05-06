'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.load();

const config = {
  prefix: process.env.JG_TOOLS_PREFIX,
  mainBranch: process.env.JG_TOOLS_MAIN_BRANCH || 'master',
  branchSeparator: process.env.JG_TOOLS_BRANCH_SEPARATOR || '-',
  remote: process.env.REMOTE || 'origin'
};

if (!process.env.JG_TOOLS_PREFIX) {
  (0, _ora2.default)().fail('You must configure jira-git-tools. Add mandatory "prefix" variable to your environment');
}

exports.default = config;