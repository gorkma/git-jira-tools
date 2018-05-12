#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async issueTag => {
  const spinner = (0, _ora2.default)();

  const branch = !issueTag ? await (0, _utils.requestBranch)() : await (0, _utils.searchIssueTagBranch)(issueTag);

  if (!branch) {
    return spinner.fail('Branch not found');
  }

  await (0, _promise2.default)().checkout(branch);
  spinner.succeed('Moved to branch');
};

// eslint-disable-next-line no-console
run(process.argv[2]).catch(e => console.error(e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tb3ZlLmpzIl0sIm5hbWVzIjpbInJ1biIsImlzc3VlVGFnIiwic3Bpbm5lciIsImJyYW5jaCIsImZhaWwiLCJjaGVja291dCIsInN1Y2NlZWQiLCJwcm9jZXNzIiwiYXJndiIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxNQUFNLE1BQU1DLFFBQU4sSUFBa0I7QUFDNUIsUUFBTUMsVUFBVSxvQkFBaEI7O0FBRUEsUUFBTUMsU0FBUyxDQUFDRixRQUFELEdBQVksTUFBTSwyQkFBbEIsR0FBb0MsTUFBTSxpQ0FBcUJBLFFBQXJCLENBQXpEOztBQUVBLE1BQUksQ0FBQ0UsTUFBTCxFQUFhO0FBQ1gsV0FBT0QsUUFBUUUsSUFBUixDQUFhLGtCQUFiLENBQVA7QUFDRDs7QUFFRCxRQUFNLHlCQUFNQyxRQUFOLENBQWVGLE1BQWYsQ0FBTjtBQUNBRCxVQUFRSSxPQUFSLENBQWdCLGlCQUFoQjtBQUNELENBWEQ7O0FBYUE7QUFDQU4sSUFBSU8sUUFBUUMsSUFBUixDQUFhLENBQWIsQ0FBSixFQUFxQkMsS0FBckIsQ0FBMkJDLEtBQUtDLFFBQVFDLEtBQVIsQ0FBY0YsQ0FBZCxDQUFoQyIsImZpbGUiOiJtb3ZlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmltcG9ydCBnaXQgZnJvbSAnc2ltcGxlLWdpdC9wcm9taXNlJ1xuaW1wb3J0IG9yYSBmcm9tICdvcmEnXG5pbXBvcnQgeyByZXF1ZXN0QnJhbmNoLCBzZWFyY2hJc3N1ZVRhZ0JyYW5jaCB9IGZyb20gJy4vdXRpbHMnXG5cbmNvbnN0IHJ1biA9IGFzeW5jIGlzc3VlVGFnID0+IHtcbiAgY29uc3Qgc3Bpbm5lciA9IG9yYSgpXG5cbiAgY29uc3QgYnJhbmNoID0gIWlzc3VlVGFnID8gYXdhaXQgcmVxdWVzdEJyYW5jaCgpIDogYXdhaXQgc2VhcmNoSXNzdWVUYWdCcmFuY2goaXNzdWVUYWcpXG5cbiAgaWYgKCFicmFuY2gpIHtcbiAgICByZXR1cm4gc3Bpbm5lci5mYWlsKCdCcmFuY2ggbm90IGZvdW5kJylcbiAgfVxuXG4gIGF3YWl0IGdpdCgpLmNoZWNrb3V0KGJyYW5jaClcbiAgc3Bpbm5lci5zdWNjZWVkKCdNb3ZlZCB0byBicmFuY2gnKVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxucnVuKHByb2Nlc3MuYXJndlsyXSkuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKVxuIl19