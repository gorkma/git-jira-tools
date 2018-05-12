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

// eslint-disable-next-line no-console
run().catch(e => console.error(e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91cGRhdGUuanMiXSwibmFtZXMiOlsicnVuIiwic3Bpbm5lciIsInN0YXJ0Iiwic3RhdHVzIiwiY3VycmVudEJyYW5jaCIsImN1cnJlbnQiLCJtYXRjaCIsImlzc3VlQnJhbmNoUGF0dGVybiIsImZhaWwiLCJzdGFzaE5hbWUiLCJmaWxlcyIsImxlbmd0aCIsInN0YXNoIiwic3VjY2VlZCIsImNvbmZpZyIsIm1haW5CcmFuY2giLCJjaGVja291dCIsInB1bGwiLCJzaWxlbnQiLCJyZWJhc2UiLCJlcnJvciIsImNvbmZsaWN0U3RhdHVzIiwid2FybiIsImNvbmZsaWN0ZWQiLCJtYXAiLCJwYXRoIiwiam9pbiIsInJhd1N0YXNoZXMiLCJzdGFzaEluZGV4Iiwic3BsaXQiLCJuYW1lUmVnZXhwIiwibmFtZSIsInRyaW0iLCJmaW5kSW5kZXgiLCJjYXRjaCIsImUiLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsTUFBTSxZQUFZO0FBQ3RCLFFBQU1DLFVBQVUsb0JBQWhCOztBQUVBQSxVQUFRQyxLQUFSLENBQWMsY0FBZDtBQUNBLFFBQU1DLFNBQVMsTUFBTSx5QkFBTUEsTUFBTixFQUFyQjtBQUNBLFFBQU1DLGdCQUFnQkQsT0FBT0UsT0FBN0I7O0FBRUEsTUFBSSxDQUFDRCxjQUFjRSxLQUFkLENBQW9CQyx5QkFBcEIsQ0FBTCxFQUE4QztBQUM1QyxXQUFPTixRQUFRTyxJQUFSLENBQWEsa0RBQWIsQ0FBUDtBQUNEOztBQUVELE1BQUlDLFNBQUo7QUFDQSxNQUFJTixPQUFPTyxLQUFQLENBQWFDLE1BQWIsR0FBc0IsQ0FBMUIsRUFBNkI7QUFDM0JGLGdCQUFhLEdBQUVMLGNBQWNFLEtBQWQsQ0FBb0JDLHlCQUFwQixFQUF3QyxDQUF4QyxDQUEyQyxNQUExRDtBQUNBLFVBQU0seUJBQU1LLEtBQU4sQ0FBWSxDQUFDLE1BQUQsRUFBUyxxQkFBVCxFQUFnQ0gsU0FBaEMsQ0FBWixDQUFOO0FBQ0FSLFlBQVFZLE9BQVIsQ0FBZ0IsYUFBaEI7QUFDRDs7QUFFRFosVUFBUUMsS0FBUixDQUFlLFlBQVdZLGlCQUFPQyxVQUFXLEVBQTVDO0FBQ0EsUUFBTSx5QkFBTUMsUUFBTixDQUFlRixpQkFBT0MsVUFBdEIsQ0FBTjtBQUNBLFFBQU0seUJBQU1FLElBQU4sRUFBTjs7QUFFQWhCLFVBQVFZLE9BQVIsQ0FBaUIsR0FBRUMsaUJBQU9DLFVBQVcsVUFBckMsRUFBZ0RiLEtBQWhELENBQXVELFlBQVdZLGlCQUFPQyxVQUFXLEVBQXBGO0FBQ0EsUUFBTSx5QkFBTUMsUUFBTixDQUFlWixhQUFmLENBQU47O0FBRUEsTUFBSTtBQUNGLFVBQU0seUJBQ0hjLE1BREcsQ0FDSSxJQURKLEVBRUhDLE1BRkcsQ0FFSSxDQUFDTCxpQkFBT0MsVUFBUixDQUZKLENBQU47QUFHRCxHQUpELENBSUUsT0FBT0ssS0FBUCxFQUFjO0FBQ2QsVUFBTUMsaUJBQWlCLE1BQU0seUJBQU1sQixNQUFOLEVBQTdCO0FBQ0EsV0FBT0YsUUFBUXFCLElBQVIsQ0FDTCwrRUFDRUQsZUFBZUUsVUFBZixDQUEwQkMsR0FBMUIsQ0FBOEJDLFFBQVMsT0FBTUEsSUFBSyxFQUFsRCxFQUFxREMsSUFBckQsQ0FBMEQsSUFBMUQsQ0FGRyxDQUFQO0FBSUQ7O0FBRUR6QixVQUFRWSxPQUFSLENBQWlCLEdBQUVDLGlCQUFPQyxVQUFXLFVBQXJDOztBQUVBLE1BQUlOLFNBQUosRUFBZTtBQUNiUixZQUFRQyxLQUFSLENBQWMsa0JBQWQ7QUFDQSxRQUFJeUIsYUFBYSxNQUFNLHlCQUFNZixLQUFOLENBQVksQ0FBQyxNQUFELENBQVosQ0FBdkI7QUFDQSxVQUFNZ0IsYUFBYUQsV0FDaEJFLEtBRGdCLENBQ1YsSUFEVSxFQUVoQkwsR0FGZ0IsQ0FFWlosU0FBUztBQUNaLFlBQU1rQixhQUFhLFVBQW5COztBQUVBLFVBQUlDLE9BQU8sRUFBWDtBQUNBLFVBQUluQixNQUFNTixLQUFOLENBQVl3QixVQUFaLENBQUosRUFBNkI7QUFDM0JDLGVBQU9uQixNQUFNTixLQUFOLENBQVl3QixVQUFaLEVBQXdCLENBQXhCLEVBQTJCRSxJQUEzQixFQUFQO0FBQ0Q7O0FBRUQsYUFBT0QsSUFBUDtBQUNELEtBWGdCLEVBWWhCRSxTQVpnQixDQVlORixRQUFRQSxTQUFTdEIsU0FaWCxDQUFuQjs7QUFjQSxVQUFNLHlCQUFNRyxLQUFOLENBQVksQ0FBQyxPQUFELEVBQVcsVUFBU2dCLFVBQVcsR0FBL0IsQ0FBWixDQUFOO0FBQ0EsVUFBTSx5QkFBTWhCLEtBQU4sQ0FBWSxDQUFDLE1BQUQsRUFBVSxVQUFTZ0IsVUFBVyxHQUE5QixDQUFaLENBQU47QUFDQTNCLFlBQVFZLE9BQVIsQ0FBZ0IsaUJBQWhCO0FBQ0Q7QUFDRixDQTVERDs7QUE4REE7QUFDQWIsTUFBTWtDLEtBQU4sQ0FBWUMsS0FBS0MsUUFBUWhCLEtBQVIsQ0FBY2UsQ0FBZCxDQUFqQiIsImZpbGUiOiJ1cGRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IGdpdCBmcm9tICdzaW1wbGUtZ2l0L3Byb21pc2UnXG5pbXBvcnQgb3JhIGZyb20gJ29yYSdcbmltcG9ydCB7IGlzc3VlQnJhbmNoUGF0dGVybiB9IGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJ1xuXG5jb25zdCBydW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHNwaW5uZXIgPSBvcmEoKVxuXG4gIHNwaW5uZXIuc3RhcnQoJ1NhdmluZyBzdGFzaCcpXG4gIGNvbnN0IHN0YXR1cyA9IGF3YWl0IGdpdCgpLnN0YXR1cygpXG4gIGNvbnN0IGN1cnJlbnRCcmFuY2ggPSBzdGF0dXMuY3VycmVudFxuXG4gIGlmICghY3VycmVudEJyYW5jaC5tYXRjaChpc3N1ZUJyYW5jaFBhdHRlcm4pKSB7XG4gICAgcmV0dXJuIHNwaW5uZXIuZmFpbCgnSW52YWxpZCBvcGVyYXRpb24uIFlvdSBhcmUgbm90IG9uIGEgaXNzdWUgYnJhbmNoJylcbiAgfVxuXG4gIGxldCBzdGFzaE5hbWVcbiAgaWYgKHN0YXR1cy5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgc3Rhc2hOYW1lID0gYCR7Y3VycmVudEJyYW5jaC5tYXRjaChpc3N1ZUJyYW5jaFBhdHRlcm4pWzBdfS1XSVBgXG4gICAgYXdhaXQgZ2l0KCkuc3Rhc2goWydzYXZlJywgJy0taW5jbHVkZS11bnRyYWNrZWQnLCBzdGFzaE5hbWVdKVxuICAgIHNwaW5uZXIuc3VjY2VlZCgnU3Rhc2ggc2F2ZWQnKVxuICB9XG5cbiAgc3Bpbm5lci5zdGFydChgVXBkYXRpbmcgJHtjb25maWcubWFpbkJyYW5jaH1gKVxuICBhd2FpdCBnaXQoKS5jaGVja291dChjb25maWcubWFpbkJyYW5jaClcbiAgYXdhaXQgZ2l0KCkucHVsbCgpXG5cbiAgc3Bpbm5lci5zdWNjZWVkKGAke2NvbmZpZy5tYWluQnJhbmNofSB1cGRhdGVkYCkuc3RhcnQoYFJlYmFzaW5nICR7Y29uZmlnLm1haW5CcmFuY2h9YClcbiAgYXdhaXQgZ2l0KCkuY2hlY2tvdXQoY3VycmVudEJyYW5jaClcblxuICB0cnkge1xuICAgIGF3YWl0IGdpdCgpXG4gICAgICAuc2lsZW50KHRydWUpXG4gICAgICAucmViYXNlKFtjb25maWcubWFpbkJyYW5jaF0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgY29uZmxpY3RTdGF0dXMgPSBhd2FpdCBnaXQoKS5zdGF0dXMoKVxuICAgIHJldHVybiBzcGlubmVyLndhcm4oXG4gICAgICAnQ09ORkxJQ1Q6IFJlc29sdmUgYWxsIGNvbmZsaWN0cyBtYW51YWxseSBhbmQgY29udGludWUgcmViYXNlLCBjb25mbGljdHM6XFxuJyArXG4gICAgICAgIGNvbmZsaWN0U3RhdHVzLmNvbmZsaWN0ZWQubWFwKHBhdGggPT4gYCAgLSAke3BhdGh9YCkuam9pbignXFxuJylcbiAgICApXG4gIH1cblxuICBzcGlubmVyLnN1Y2NlZWQoYCR7Y29uZmlnLm1haW5CcmFuY2h9IHJlYmFzZWRgKVxuXG4gIGlmIChzdGFzaE5hbWUpIHtcbiAgICBzcGlubmVyLnN0YXJ0KCdSZWFwcGx5aW5nIHN0YXNoJylcbiAgICBsZXQgcmF3U3Rhc2hlcyA9IGF3YWl0IGdpdCgpLnN0YXNoKFsnbGlzdCddKVxuICAgIGNvbnN0IHN0YXNoSW5kZXggPSByYXdTdGFzaGVzXG4gICAgICAuc3BsaXQoJ1xcbicpXG4gICAgICAubWFwKHN0YXNoID0+IHtcbiAgICAgICAgY29uc3QgbmFtZVJlZ2V4cCA9IC8uKjooLiopJC9cblxuICAgICAgICBsZXQgbmFtZSA9ICcnXG4gICAgICAgIGlmIChzdGFzaC5tYXRjaChuYW1lUmVnZXhwKSkge1xuICAgICAgICAgIG5hbWUgPSBzdGFzaC5tYXRjaChuYW1lUmVnZXhwKVsxXS50cmltKClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuYW1lXG4gICAgICB9KVxuICAgICAgLmZpbmRJbmRleChuYW1lID0+IG5hbWUgPT09IHN0YXNoTmFtZSlcblxuICAgIGF3YWl0IGdpdCgpLnN0YXNoKFsnYXBwbHknLCBgc3Rhc2hAeyR7c3Rhc2hJbmRleH19YF0pXG4gICAgYXdhaXQgZ2l0KCkuc3Rhc2goWydkcm9wJywgYHN0YXNoQHske3N0YXNoSW5kZXh9fWBdKVxuICAgIHNwaW5uZXIuc3VjY2VlZCgnU3Rhc2ggcmVhcHBsaWVkJylcbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxucnVuKCkuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKVxuIl19