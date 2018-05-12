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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJyZXF1ZXN0QnJhbmNoIiwiYnJhbmNoZXMiLCJicmFuY2hMb2NhbCIsInJlYWRsaW5lIiwiZW1pdEtleXByZXNzRXZlbnRzIiwicHJvY2VzcyIsInN0ZGluIiwiaXNzdWVzIiwiYWxsIiwiZmlsdGVyIiwiYnJhbmNoIiwic3RhcnRzV2l0aCIsImNvbmZpZyIsInByZWZpeCIsInVpIiwiaW5xdWlyZXIiLCJCb3R0b21CYXIiLCJvbiIsImNoIiwia2V5IiwibmFtZSIsImNsb3NlIiwiYW5zd2VycyIsInByb21wdCIsInR5cGUiLCJtZXNzYWdlIiwiY2hvaWNlcyIsInNlYXJjaElzc3VlVGFnQnJhbmNoIiwiaXNzdWVUYWciLCJmaW5kIiwiaXNzdWVCcmFuY2hQYXR0ZXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVPLE1BQU1BLHdDQUFnQixZQUFZO0FBQ3ZDLFFBQU1DLFdBQVcsTUFBTSx5QkFBTUMsV0FBTixFQUF2QjtBQUNBQyxxQkFBU0Msa0JBQVQsQ0FBNEJDLFFBQVFDLEtBQXBDOztBQUVBLFFBQU1DLFNBQVNOLFNBQVNPLEdBQVQsQ0FBYUMsTUFBYixDQUFvQkMsVUFBVUEsT0FBT0MsVUFBUCxDQUFrQkMsaUJBQU9DLE1BQXpCLENBQTlCLENBQWY7O0FBRUEsUUFBTUMsS0FBSyxJQUFJQyxtQkFBU0QsRUFBVCxDQUFZRSxTQUFoQixFQUFYO0FBQ0FYLFVBQVFDLEtBQVIsQ0FBY1csRUFBZCxDQUFpQixVQUFqQixFQUE2QixDQUFDQyxFQUFELEVBQUtDLEdBQUwsS0FBYTtBQUN4QyxRQUFJQSxPQUFPQSxJQUFJQyxJQUFKLEtBQWEsUUFBeEIsRUFBa0M7QUFDaENOLFNBQUdPLEtBQUg7QUFDRDtBQUNGLEdBSkQ7O0FBTUEsUUFBTUMsVUFBVSxNQUFNUCxtQkFBU1EsTUFBVCxDQUFnQixDQUNwQztBQUNFSCxVQUFNLFFBRFI7QUFFRUksVUFBTSxNQUZSO0FBR0VDLGFBQVMsMENBSFg7QUFJRUMsYUFBU25CO0FBSlgsR0FEb0MsQ0FBaEIsQ0FBdEI7O0FBU0EsU0FBT2UsUUFBUSxRQUFSLENBQVA7QUFDRCxDQXZCTTs7QUF5QkEsTUFBTUssc0RBQXVCLE1BQU1DLFFBQU4sSUFBa0I7QUFDcEQsUUFBTTNCLFdBQVcsTUFBTSx5QkFBTUMsV0FBTixFQUF2Qjs7QUFFQSxTQUFPRCxTQUFTTyxHQUFULENBQWFxQixJQUFiLENBQWtCbkIsVUFBVUEsT0FBT0MsVUFBUCxDQUFtQixHQUFFQyxpQkFBT0MsTUFBTyxHQUFFZSxRQUFTLEVBQTlDLENBQTVCLENBQVA7QUFDRCxDQUpNOztBQU1BLE1BQU1FLGtEQUFzQixJQUFHbEIsaUJBQU9DLE1BQU8sT0FBN0MiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInXG5pbXBvcnQgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnXG5pbXBvcnQgZ2l0IGZyb20gJ3NpbXBsZS1naXQvcHJvbWlzZSdcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5cbmV4cG9ydCBjb25zdCByZXF1ZXN0QnJhbmNoID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBicmFuY2hlcyA9IGF3YWl0IGdpdCgpLmJyYW5jaExvY2FsKClcbiAgcmVhZGxpbmUuZW1pdEtleXByZXNzRXZlbnRzKHByb2Nlc3Muc3RkaW4pXG5cbiAgY29uc3QgaXNzdWVzID0gYnJhbmNoZXMuYWxsLmZpbHRlcihicmFuY2ggPT4gYnJhbmNoLnN0YXJ0c1dpdGgoY29uZmlnLnByZWZpeCkpXG5cbiAgY29uc3QgdWkgPSBuZXcgaW5xdWlyZXIudWkuQm90dG9tQmFyKClcbiAgcHJvY2Vzcy5zdGRpbi5vbigna2V5cHJlc3MnLCAoY2gsIGtleSkgPT4ge1xuICAgIGlmIChrZXkgJiYga2V5Lm5hbWUgPT09ICdlc2NhcGUnKSB7XG4gICAgICB1aS5jbG9zZSgpXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGFuc3dlcnMgPSBhd2FpdCBpbnF1aXJlci5wcm9tcHQoW1xuICAgIHtcbiAgICAgIG5hbWU6ICdicmFuY2gnLFxuICAgICAgdHlwZTogJ2xpc3QnLFxuICAgICAgbWVzc2FnZTogJ1NlbGVjdCBhbiBpc3N1ZSAocHJlc3MgXCJlc2NcIiB0byBjYW5jZWwpOicsXG4gICAgICBjaG9pY2VzOiBpc3N1ZXNcbiAgICB9XG4gIF0pXG5cbiAgcmV0dXJuIGFuc3dlcnNbJ2JyYW5jaCddXG59XG5cbmV4cG9ydCBjb25zdCBzZWFyY2hJc3N1ZVRhZ0JyYW5jaCA9IGFzeW5jIGlzc3VlVGFnID0+IHtcbiAgY29uc3QgYnJhbmNoZXMgPSBhd2FpdCBnaXQoKS5icmFuY2hMb2NhbCgpXG5cbiAgcmV0dXJuIGJyYW5jaGVzLmFsbC5maW5kKGJyYW5jaCA9PiBicmFuY2guc3RhcnRzV2l0aChgJHtjb25maWcucHJlZml4fSR7aXNzdWVUYWd9YCkpXG59XG5cbmV4cG9ydCBjb25zdCBpc3N1ZUJyYW5jaFBhdHRlcm4gPSBgKCR7Y29uZmlnLnByZWZpeH1cXFxcZCopYFxuIl19