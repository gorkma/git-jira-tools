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

const run = async issueTag => {
  const spinner = (0, _ora2.default)();

  const branch = issueTag ? await (0, _utils.searchIssueTagBranch)(issueTag) : (await (0, _promise2.default)().status()).current;

  if (!branch) {
    return spinner.fail('You must provide a valid branch');
  }

  if (!branch.match(_utils.issueBranchPattern)) {
    return spinner.fail('Invalid operation. You are not on a issue branch');
  }

  spinner.start('Updating publication');
  await (0, _promise2.default)().push(_config2.default.remote, branch, { '--set-upstream': null, '--force': null });
  spinner.succeed('Publication updated');
};

// eslint-disable-next-line no-console
run(process.argv[2]).catch(e => console.error(e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZXB1Ymxpc2guanMiXSwibmFtZXMiOlsicnVuIiwiaXNzdWVUYWciLCJzcGlubmVyIiwiYnJhbmNoIiwic3RhdHVzIiwiY3VycmVudCIsImZhaWwiLCJtYXRjaCIsImlzc3VlQnJhbmNoUGF0dGVybiIsInN0YXJ0IiwicHVzaCIsImNvbmZpZyIsInJlbW90ZSIsInN1Y2NlZWQiLCJwcm9jZXNzIiwiYXJndiIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLE1BQU0sTUFBTUMsUUFBTixJQUFrQjtBQUM1QixRQUFNQyxVQUFVLG9CQUFoQjs7QUFFQSxRQUFNQyxTQUFTRixXQUFXLE1BQU0saUNBQXFCQSxRQUFyQixDQUFqQixHQUFrRCxDQUFDLE1BQU0seUJBQU1HLE1BQU4sRUFBUCxFQUF1QkMsT0FBeEY7O0FBRUEsTUFBSSxDQUFDRixNQUFMLEVBQWE7QUFDWCxXQUFPRCxRQUFRSSxJQUFSLENBQWEsaUNBQWIsQ0FBUDtBQUNEOztBQUVELE1BQUksQ0FBQ0gsT0FBT0ksS0FBUCxDQUFhQyx5QkFBYixDQUFMLEVBQXVDO0FBQ3JDLFdBQU9OLFFBQVFJLElBQVIsQ0FBYSxrREFBYixDQUFQO0FBQ0Q7O0FBRURKLFVBQVFPLEtBQVIsQ0FBYyxzQkFBZDtBQUNBLFFBQU0seUJBQU1DLElBQU4sQ0FBV0MsaUJBQU9DLE1BQWxCLEVBQTBCVCxNQUExQixFQUFrQyxFQUFFLGtCQUFrQixJQUFwQixFQUEwQixXQUFXLElBQXJDLEVBQWxDLENBQU47QUFDQUQsVUFBUVcsT0FBUixDQUFnQixxQkFBaEI7QUFDRCxDQWhCRDs7QUFrQkE7QUFDQWIsSUFBSWMsUUFBUUMsSUFBUixDQUFhLENBQWIsQ0FBSixFQUFxQkMsS0FBckIsQ0FBMkJDLEtBQUtDLFFBQVFDLEtBQVIsQ0FBY0YsQ0FBZCxDQUFoQyIsImZpbGUiOiJyZXB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IGdpdCBmcm9tICdzaW1wbGUtZ2l0L3Byb21pc2UnXG5pbXBvcnQgb3JhIGZyb20gJ29yYSdcbmltcG9ydCB7IGlzc3VlQnJhbmNoUGF0dGVybiwgc2VhcmNoSXNzdWVUYWdCcmFuY2ggfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgcnVuID0gYXN5bmMgaXNzdWVUYWcgPT4ge1xuICBjb25zdCBzcGlubmVyID0gb3JhKClcblxuICBjb25zdCBicmFuY2ggPSBpc3N1ZVRhZyA/IGF3YWl0IHNlYXJjaElzc3VlVGFnQnJhbmNoKGlzc3VlVGFnKSA6IChhd2FpdCBnaXQoKS5zdGF0dXMoKSkuY3VycmVudFxuXG4gIGlmICghYnJhbmNoKSB7XG4gICAgcmV0dXJuIHNwaW5uZXIuZmFpbCgnWW91IG11c3QgcHJvdmlkZSBhIHZhbGlkIGJyYW5jaCcpXG4gIH1cblxuICBpZiAoIWJyYW5jaC5tYXRjaChpc3N1ZUJyYW5jaFBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHNwaW5uZXIuZmFpbCgnSW52YWxpZCBvcGVyYXRpb24uIFlvdSBhcmUgbm90IG9uIGEgaXNzdWUgYnJhbmNoJylcbiAgfVxuXG4gIHNwaW5uZXIuc3RhcnQoJ1VwZGF0aW5nIHB1YmxpY2F0aW9uJylcbiAgYXdhaXQgZ2l0KCkucHVzaChjb25maWcucmVtb3RlLCBicmFuY2gsIHsgJy0tc2V0LXVwc3RyZWFtJzogbnVsbCwgJy0tZm9yY2UnOiBudWxsIH0pXG4gIHNwaW5uZXIuc3VjY2VlZCgnUHVibGljYXRpb24gdXBkYXRlZCcpXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5ydW4ocHJvY2Vzcy5hcmd2WzJdKS5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpXG4iXX0=