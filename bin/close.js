#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _utils = require('./utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async issueTag => {
  const spinner = (0, _ora2.default)();

  const branch = !issueTag ? await (0, _utils.requestBranch)() : await (0, _utils.searchIssueTagBranch)(issueTag);

  if (!branch) {
    return spinner.fail('Branch not found');
  }

  spinner.start('Removing remote branch');
  try {
    await (0, _promise2.default)().silent(true).push(_config2.default.remote, `:${branch}`);
    spinner.succeed('Remote branch removed');
  } catch (error) {
    spinner.info(`Remote branch not found, pruning ${_config2.default.remote}`);
    await (0, _promise2.default)().raw(['remote', 'prune', _config2.default.remote]);
  }

  spinner.start('Removing local branch');

  const status = await (0, _promise2.default)().status();
  const currentBranch = status.current;

  if (currentBranch === branch) {
    spinner.info(`Removing current branch, moving to ${_config2.default.mainBranch}`);
    await (0, _promise2.default)().checkout(_config2.default.mainBranch);
  }

  spinner.start('Removing local branch');
  try {
    await (0, _promise2.default)().silent(true).deleteLocalBranch(branch);
    spinner.succeed('Local branch removed');
  } catch (error) {
    spinner.info('Branch not fully merged');
    const remove = (await _inquirer2.default.prompt([{
      name: 'remove',
      message: 'Are you sure you want to close it? (y or n)',
      validate: answer => ['y', 'n'].includes(answer.toLowerCase())
    }]))['remove'];

    if (remove === 'y') {
      await (0, _promise2.default)().raw(['branch', '-D', branch]);
      spinner.succeed('Local branch removed');
    } else {
      return spinner.fail("Won't remove branch, not fully merged");
    }
  }
};

// eslint-disable-next-line no-console
run(process.argv[2]).catch(e => console.error(e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbG9zZS5qcyJdLCJuYW1lcyI6WyJydW4iLCJpc3N1ZVRhZyIsInNwaW5uZXIiLCJicmFuY2giLCJmYWlsIiwic3RhcnQiLCJzaWxlbnQiLCJwdXNoIiwiY29uZmlnIiwicmVtb3RlIiwic3VjY2VlZCIsImVycm9yIiwiaW5mbyIsInJhdyIsInN0YXR1cyIsImN1cnJlbnRCcmFuY2giLCJjdXJyZW50IiwibWFpbkJyYW5jaCIsImNoZWNrb3V0IiwiZGVsZXRlTG9jYWxCcmFuY2giLCJyZW1vdmUiLCJpbnF1aXJlciIsInByb21wdCIsIm5hbWUiLCJtZXNzYWdlIiwidmFsaWRhdGUiLCJhbnN3ZXIiLCJpbmNsdWRlcyIsInRvTG93ZXJDYXNlIiwicHJvY2VzcyIsImFyZ3YiLCJjYXRjaCIsImUiLCJjb25zb2xlIl0sIm1hcHBpbmdzIjoiOztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxNQUFNLE1BQU1DLFFBQU4sSUFBa0I7QUFDNUIsUUFBTUMsVUFBVSxvQkFBaEI7O0FBRUEsUUFBTUMsU0FBUyxDQUFDRixRQUFELEdBQVksTUFBTSwyQkFBbEIsR0FBb0MsTUFBTSxpQ0FBcUJBLFFBQXJCLENBQXpEOztBQUVBLE1BQUksQ0FBQ0UsTUFBTCxFQUFhO0FBQ1gsV0FBT0QsUUFBUUUsSUFBUixDQUFhLGtCQUFiLENBQVA7QUFDRDs7QUFFREYsVUFBUUcsS0FBUixDQUFjLHdCQUFkO0FBQ0EsTUFBSTtBQUNGLFVBQU0seUJBQ0hDLE1BREcsQ0FDSSxJQURKLEVBRUhDLElBRkcsQ0FFRUMsaUJBQU9DLE1BRlQsRUFFa0IsSUFBR04sTUFBTyxFQUY1QixDQUFOO0FBR0FELFlBQVFRLE9BQVIsQ0FBZ0IsdUJBQWhCO0FBQ0QsR0FMRCxDQUtFLE9BQU9DLEtBQVAsRUFBYztBQUNkVCxZQUFRVSxJQUFSLENBQWMsb0NBQW1DSixpQkFBT0MsTUFBTyxFQUEvRDtBQUNBLFVBQU0seUJBQU1JLEdBQU4sQ0FBVSxDQUFDLFFBQUQsRUFBVyxPQUFYLEVBQW9CTCxpQkFBT0MsTUFBM0IsQ0FBVixDQUFOO0FBQ0Q7O0FBRURQLFVBQVFHLEtBQVIsQ0FBYyx1QkFBZDs7QUFFQSxRQUFNUyxTQUFTLE1BQU0seUJBQU1BLE1BQU4sRUFBckI7QUFDQSxRQUFNQyxnQkFBZ0JELE9BQU9FLE9BQTdCOztBQUVBLE1BQUlELGtCQUFrQlosTUFBdEIsRUFBOEI7QUFDNUJELFlBQVFVLElBQVIsQ0FBYyxzQ0FBcUNKLGlCQUFPUyxVQUFXLEVBQXJFO0FBQ0EsVUFBTSx5QkFBTUMsUUFBTixDQUFlVixpQkFBT1MsVUFBdEIsQ0FBTjtBQUNEOztBQUVEZixVQUFRRyxLQUFSLENBQWMsdUJBQWQ7QUFDQSxNQUFJO0FBQ0YsVUFBTSx5QkFDSEMsTUFERyxDQUNJLElBREosRUFFSGEsaUJBRkcsQ0FFZWhCLE1BRmYsQ0FBTjtBQUdBRCxZQUFRUSxPQUFSLENBQWdCLHNCQUFoQjtBQUNELEdBTEQsQ0FLRSxPQUFPQyxLQUFQLEVBQWM7QUFDZFQsWUFBUVUsSUFBUixDQUFhLHlCQUFiO0FBQ0EsVUFBTVEsU0FBUyxDQUFDLE1BQU1DLG1CQUFTQyxNQUFULENBQWdCLENBQ3BDO0FBQ0VDLFlBQU0sUUFEUjtBQUVFQyxlQUFTLDZDQUZYO0FBR0VDLGdCQUFVQyxVQUFVLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBV0MsUUFBWCxDQUFvQkQsT0FBT0UsV0FBUCxFQUFwQjtBQUh0QixLQURvQyxDQUFoQixDQUFQLEVBTVgsUUFOVyxDQUFmOztBQVFBLFFBQUlSLFdBQVcsR0FBZixFQUFvQjtBQUNsQixZQUFNLHlCQUFNUCxHQUFOLENBQVUsQ0FBQyxRQUFELEVBQVcsSUFBWCxFQUFpQlYsTUFBakIsQ0FBVixDQUFOO0FBQ0FELGNBQVFRLE9BQVIsQ0FBZ0Isc0JBQWhCO0FBQ0QsS0FIRCxNQUdPO0FBQ0wsYUFBT1IsUUFBUUUsSUFBUixDQUFhLHVDQUFiLENBQVA7QUFDRDtBQUNGO0FBQ0YsQ0FyREQ7O0FBdURBO0FBQ0FKLElBQUk2QixRQUFRQyxJQUFSLENBQWEsQ0FBYixDQUFKLEVBQXFCQyxLQUFyQixDQUEyQkMsS0FBS0MsUUFBUXRCLEtBQVIsQ0FBY3FCLENBQWQsQ0FBaEMiLCJmaWxlIjoiY2xvc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IGdpdCBmcm9tICdzaW1wbGUtZ2l0L3Byb21pc2UnXG5pbXBvcnQgb3JhIGZyb20gJ29yYSdcbmltcG9ydCB7IHJlcXVlc3RCcmFuY2gsIHNlYXJjaElzc3VlVGFnQnJhbmNoIH0gZnJvbSAnLi91dGlscydcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnXG5pbXBvcnQgaW5xdWlyZXIgZnJvbSAnaW5xdWlyZXInXG5cbmNvbnN0IHJ1biA9IGFzeW5jIGlzc3VlVGFnID0+IHtcbiAgY29uc3Qgc3Bpbm5lciA9IG9yYSgpXG5cbiAgY29uc3QgYnJhbmNoID0gIWlzc3VlVGFnID8gYXdhaXQgcmVxdWVzdEJyYW5jaCgpIDogYXdhaXQgc2VhcmNoSXNzdWVUYWdCcmFuY2goaXNzdWVUYWcpXG5cbiAgaWYgKCFicmFuY2gpIHtcbiAgICByZXR1cm4gc3Bpbm5lci5mYWlsKCdCcmFuY2ggbm90IGZvdW5kJylcbiAgfVxuXG4gIHNwaW5uZXIuc3RhcnQoJ1JlbW92aW5nIHJlbW90ZSBicmFuY2gnKVxuICB0cnkge1xuICAgIGF3YWl0IGdpdCgpXG4gICAgICAuc2lsZW50KHRydWUpXG4gICAgICAucHVzaChjb25maWcucmVtb3RlLCBgOiR7YnJhbmNofWApXG4gICAgc3Bpbm5lci5zdWNjZWVkKCdSZW1vdGUgYnJhbmNoIHJlbW92ZWQnKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHNwaW5uZXIuaW5mbyhgUmVtb3RlIGJyYW5jaCBub3QgZm91bmQsIHBydW5pbmcgJHtjb25maWcucmVtb3RlfWApXG4gICAgYXdhaXQgZ2l0KCkucmF3KFsncmVtb3RlJywgJ3BydW5lJywgY29uZmlnLnJlbW90ZV0pXG4gIH1cblxuICBzcGlubmVyLnN0YXJ0KCdSZW1vdmluZyBsb2NhbCBicmFuY2gnKVxuXG4gIGNvbnN0IHN0YXR1cyA9IGF3YWl0IGdpdCgpLnN0YXR1cygpXG4gIGNvbnN0IGN1cnJlbnRCcmFuY2ggPSBzdGF0dXMuY3VycmVudFxuXG4gIGlmIChjdXJyZW50QnJhbmNoID09PSBicmFuY2gpIHtcbiAgICBzcGlubmVyLmluZm8oYFJlbW92aW5nIGN1cnJlbnQgYnJhbmNoLCBtb3ZpbmcgdG8gJHtjb25maWcubWFpbkJyYW5jaH1gKVxuICAgIGF3YWl0IGdpdCgpLmNoZWNrb3V0KGNvbmZpZy5tYWluQnJhbmNoKVxuICB9XG5cbiAgc3Bpbm5lci5zdGFydCgnUmVtb3ZpbmcgbG9jYWwgYnJhbmNoJylcbiAgdHJ5IHtcbiAgICBhd2FpdCBnaXQoKVxuICAgICAgLnNpbGVudCh0cnVlKVxuICAgICAgLmRlbGV0ZUxvY2FsQnJhbmNoKGJyYW5jaClcbiAgICBzcGlubmVyLnN1Y2NlZWQoJ0xvY2FsIGJyYW5jaCByZW1vdmVkJylcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBzcGlubmVyLmluZm8oJ0JyYW5jaCBub3QgZnVsbHkgbWVyZ2VkJylcbiAgICBjb25zdCByZW1vdmUgPSAoYXdhaXQgaW5xdWlyZXIucHJvbXB0KFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ3JlbW92ZScsXG4gICAgICAgIG1lc3NhZ2U6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gY2xvc2UgaXQ/ICh5IG9yIG4pJyxcbiAgICAgICAgdmFsaWRhdGU6IGFuc3dlciA9PiBbJ3knLCAnbiddLmluY2x1ZGVzKGFuc3dlci50b0xvd2VyQ2FzZSgpKVxuICAgICAgfVxuICAgIF0pKVsncmVtb3ZlJ11cblxuICAgIGlmIChyZW1vdmUgPT09ICd5Jykge1xuICAgICAgYXdhaXQgZ2l0KCkucmF3KFsnYnJhbmNoJywgJy1EJywgYnJhbmNoXSlcbiAgICAgIHNwaW5uZXIuc3VjY2VlZCgnTG9jYWwgYnJhbmNoIHJlbW92ZWQnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Bpbm5lci5mYWlsKFwiV29uJ3QgcmVtb3ZlIGJyYW5jaCwgbm90IGZ1bGx5IG1lcmdlZFwiKVxuICAgIH1cbiAgfVxufVxuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxucnVuKHByb2Nlc3MuYXJndlsyXSkuY2F0Y2goZSA9PiBjb25zb2xlLmVycm9yKGUpKVxuIl19