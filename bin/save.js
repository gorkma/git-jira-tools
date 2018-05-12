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

  spinner.start('Committing');
  const issueTag = currentBranch.match(_utils.issueBranchPattern)[0];
  await (0, _promise2.default)().raw(['commit', '-m', `${issueTag} ${commitMessage}`]);

  spinner.succeed('Commited');
};

const message = process.argv.slice(2);

// eslint-disable-next-line no-console
run(message.join(' ')).catch(e => console.error(e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zYXZlLmpzIl0sIm5hbWVzIjpbInJ1biIsImNvbW1pdE1lc3NhZ2UiLCJzcGlubmVyIiwiZmFpbCIsImN1cnJlbnRCcmFuY2giLCJzdGF0dXMiLCJjdXJyZW50IiwibWF0Y2giLCJpc3N1ZUJyYW5jaFBhdHRlcm4iLCJzdGFydCIsImlzc3VlVGFnIiwicmF3Iiwic3VjY2VlZCIsIm1lc3NhZ2UiLCJwcm9jZXNzIiwiYXJndiIsInNsaWNlIiwiam9pbiIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxNQUFNLE1BQU1DLGFBQU4sSUFBdUI7QUFDakMsUUFBTUMsVUFBVSxvQkFBaEI7O0FBRUEsTUFBSUQsa0JBQWtCLEVBQXRCLEVBQTBCO0FBQ3hCLFdBQU9DLFFBQVFDLElBQVIsQ0FBYSxtQ0FBYixDQUFQO0FBQ0Q7O0FBRUQsUUFBTUMsZ0JBQWdCLENBQUMsTUFBTSx5QkFBTUMsTUFBTixFQUFQLEVBQXVCQyxPQUE3Qzs7QUFFQSxNQUFJLENBQUNGLGNBQWNHLEtBQWQsQ0FBb0JDLHlCQUFwQixDQUFMLEVBQThDO0FBQzVDLFdBQU9OLFFBQVFDLElBQVIsQ0FBYSxrREFBYixDQUFQO0FBQ0Q7O0FBRURELFVBQVFPLEtBQVIsQ0FBYyxZQUFkO0FBQ0EsUUFBTUMsV0FBV04sY0FBY0csS0FBZCxDQUFvQkMseUJBQXBCLEVBQXdDLENBQXhDLENBQWpCO0FBQ0EsUUFBTSx5QkFBTUcsR0FBTixDQUFVLENBQUMsUUFBRCxFQUFXLElBQVgsRUFBa0IsR0FBRUQsUUFBUyxJQUFHVCxhQUFjLEVBQTlDLENBQVYsQ0FBTjs7QUFFQUMsVUFBUVUsT0FBUixDQUFnQixVQUFoQjtBQUNELENBbEJEOztBQW9CQSxNQUFNQyxVQUFVQyxRQUFRQyxJQUFSLENBQWFDLEtBQWIsQ0FBbUIsQ0FBbkIsQ0FBaEI7O0FBRUE7QUFDQWhCLElBQUlhLFFBQVFJLElBQVIsQ0FBYSxHQUFiLENBQUosRUFBdUJDLEtBQXZCLENBQTZCQyxLQUFLQyxRQUFRQyxLQUFSLENBQWNGLENBQWQsQ0FBbEMiLCJmaWxlIjoic2F2ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgZ2l0IGZyb20gJ3NpbXBsZS1naXQvcHJvbWlzZSdcbmltcG9ydCBvcmEgZnJvbSAnb3JhJ1xuaW1wb3J0IHsgaXNzdWVCcmFuY2hQYXR0ZXJuIH0gZnJvbSAnLi91dGlscydcblxuY29uc3QgcnVuID0gYXN5bmMgY29tbWl0TWVzc2FnZSA9PiB7XG4gIGNvbnN0IHNwaW5uZXIgPSBvcmEoKVxuXG4gIGlmIChjb21taXRNZXNzYWdlID09PSAnJykge1xuICAgIHJldHVybiBzcGlubmVyLmZhaWwoJ1lvdSBtdXN0IHByb3ZpZGUgYSBjb21taXQgbWVzc2FnZScpXG4gIH1cblxuICBjb25zdCBjdXJyZW50QnJhbmNoID0gKGF3YWl0IGdpdCgpLnN0YXR1cygpKS5jdXJyZW50XG5cbiAgaWYgKCFjdXJyZW50QnJhbmNoLm1hdGNoKGlzc3VlQnJhbmNoUGF0dGVybikpIHtcbiAgICByZXR1cm4gc3Bpbm5lci5mYWlsKCdJbnZhbGlkIG9wZXJhdGlvbi4gWW91IGFyZSBub3Qgb24gYSBpc3N1ZSBicmFuY2gnKVxuICB9XG5cbiAgc3Bpbm5lci5zdGFydCgnQ29tbWl0dGluZycpXG4gIGNvbnN0IGlzc3VlVGFnID0gY3VycmVudEJyYW5jaC5tYXRjaChpc3N1ZUJyYW5jaFBhdHRlcm4pWzBdXG4gIGF3YWl0IGdpdCgpLnJhdyhbJ2NvbW1pdCcsICctbScsIGAke2lzc3VlVGFnfSAke2NvbW1pdE1lc3NhZ2V9YF0pXG5cbiAgc3Bpbm5lci5zdWNjZWVkKCdDb21taXRlZCcpXG59XG5cbmNvbnN0IG1lc3NhZ2UgPSBwcm9jZXNzLmFyZ3Yuc2xpY2UoMilcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbnJ1bihtZXNzYWdlLmpvaW4oJyAnKSkuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKVxuIl19