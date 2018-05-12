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

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async (issueTag, options) => {
  const spinner = (0, _ora2.default)();

  const branch = issueTag ? await (0, _utils.searchIssueTagBranch)(issueTag) : (await (0, _promise2.default)().status()).current;

  if (!branch) {
    return spinner.fail('You must provide a valid branch');
  }

  if (!branch.match(_utils.issueBranchPattern)) {
    return spinner.fail('Invalid operation. You are not on a issue branch');
  }

  spinner.start('Publishing');

  try {
    await (0, _promise2.default)().silent(true).push(_config2.default.remote, branch, { '--set-upstream': null });
    spinner.succeed('Published');
  } catch (error) {
    spinner.info('Another version of branch already published');
    const publish = (await _inquirer2.default.prompt([{
      name: 'publish',
      message: 'Do you want force update publication? (y or n)',
      validate: answer => ['y', 'n'].includes(answer.toLowerCase())
    }]))['publish'];

    if (publish === 'y') {
      await (0, _promise2.default)().silent(true).push(_config2.default.remote, branch, { '--set-upstream': null, '--force': null });
      spinner.succeed('Published');
    } else {
      return spinner.fail("Won't publish branch, another version already published");
    }
  }

  if (!options.find(word => word === '--no-pr')) {
    (0, _opn2.default)(`https://github.com/workshare/alpaca/compare/${_config2.default.mainBranch}...${branch}?expand=1`, {
      wait: false
    });
  }
};

const words = process.argv.slice(2);

const options = words.filter(word => word.startsWith('--'));
const message = words.filter(word => !word.startsWith('--'));

// eslint-disable-next-line no-console
run(message.shift(), options).catch(e => console.error(e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wdWJsaXNoLmpzIl0sIm5hbWVzIjpbInJ1biIsImlzc3VlVGFnIiwib3B0aW9ucyIsInNwaW5uZXIiLCJicmFuY2giLCJzdGF0dXMiLCJjdXJyZW50IiwiZmFpbCIsIm1hdGNoIiwiaXNzdWVCcmFuY2hQYXR0ZXJuIiwic3RhcnQiLCJzaWxlbnQiLCJwdXNoIiwiY29uZmlnIiwicmVtb3RlIiwic3VjY2VlZCIsImVycm9yIiwiaW5mbyIsInB1Ymxpc2giLCJpbnF1aXJlciIsInByb21wdCIsIm5hbWUiLCJtZXNzYWdlIiwidmFsaWRhdGUiLCJhbnN3ZXIiLCJpbmNsdWRlcyIsInRvTG93ZXJDYXNlIiwiZmluZCIsIndvcmQiLCJtYWluQnJhbmNoIiwid2FpdCIsIndvcmRzIiwicHJvY2VzcyIsImFyZ3YiLCJzbGljZSIsImZpbHRlciIsInN0YXJ0c1dpdGgiLCJzaGlmdCIsImNhdGNoIiwiZSIsImNvbnNvbGUiXSwibWFwcGluZ3MiOiI7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsTUFBTUEsTUFBTSxPQUFPQyxRQUFQLEVBQWlCQyxPQUFqQixLQUE2QjtBQUN2QyxRQUFNQyxVQUFVLG9CQUFoQjs7QUFFQSxRQUFNQyxTQUFTSCxXQUFXLE1BQU0saUNBQXFCQSxRQUFyQixDQUFqQixHQUFrRCxDQUFDLE1BQU0seUJBQU1JLE1BQU4sRUFBUCxFQUF1QkMsT0FBeEY7O0FBRUEsTUFBSSxDQUFDRixNQUFMLEVBQWE7QUFDWCxXQUFPRCxRQUFRSSxJQUFSLENBQWEsaUNBQWIsQ0FBUDtBQUNEOztBQUVELE1BQUksQ0FBQ0gsT0FBT0ksS0FBUCxDQUFhQyx5QkFBYixDQUFMLEVBQXVDO0FBQ3JDLFdBQU9OLFFBQVFJLElBQVIsQ0FBYSxrREFBYixDQUFQO0FBQ0Q7O0FBRURKLFVBQVFPLEtBQVIsQ0FBYyxZQUFkOztBQUVBLE1BQUk7QUFDRixVQUFNLHlCQUNIQyxNQURHLENBQ0ksSUFESixFQUVIQyxJQUZHLENBRUVDLGlCQUFPQyxNQUZULEVBRWlCVixNQUZqQixFQUV5QixFQUFFLGtCQUFrQixJQUFwQixFQUZ6QixDQUFOO0FBR0FELFlBQVFZLE9BQVIsQ0FBZ0IsV0FBaEI7QUFDRCxHQUxELENBS0UsT0FBT0MsS0FBUCxFQUFjO0FBQ2RiLFlBQVFjLElBQVIsQ0FBYSw2Q0FBYjtBQUNBLFVBQU1DLFVBQVUsQ0FBQyxNQUFNQyxtQkFBU0MsTUFBVCxDQUFnQixDQUNyQztBQUNFQyxZQUFNLFNBRFI7QUFFRUMsZUFBUyxnREFGWDtBQUdFQyxnQkFBVUMsVUFBVSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVdDLFFBQVgsQ0FBb0JELE9BQU9FLFdBQVAsRUFBcEI7QUFIdEIsS0FEcUMsQ0FBaEIsQ0FBUCxFQU1aLFNBTlksQ0FBaEI7O0FBUUEsUUFBSVIsWUFBWSxHQUFoQixFQUFxQjtBQUNuQixZQUFNLHlCQUNIUCxNQURHLENBQ0ksSUFESixFQUVIQyxJQUZHLENBRUVDLGlCQUFPQyxNQUZULEVBRWlCVixNQUZqQixFQUV5QixFQUFFLGtCQUFrQixJQUFwQixFQUEwQixXQUFXLElBQXJDLEVBRnpCLENBQU47QUFHQUQsY0FBUVksT0FBUixDQUFnQixXQUFoQjtBQUNELEtBTEQsTUFLTztBQUNMLGFBQU9aLFFBQVFJLElBQVIsQ0FBYSx5REFBYixDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxNQUFJLENBQUNMLFFBQVF5QixJQUFSLENBQWFDLFFBQVFBLFNBQVMsU0FBOUIsQ0FBTCxFQUErQztBQUM3Qyx1QkFBYSwrQ0FBOENmLGlCQUFPZ0IsVUFBVyxNQUFLekIsTUFBTyxXQUF6RixFQUFxRztBQUNuRzBCLFlBQU07QUFENkYsS0FBckc7QUFHRDtBQUNGLENBN0NEOztBQStDQSxNQUFNQyxRQUFRQyxRQUFRQyxJQUFSLENBQWFDLEtBQWIsQ0FBbUIsQ0FBbkIsQ0FBZDs7QUFFQSxNQUFNaEMsVUFBVTZCLE1BQU1JLE1BQU4sQ0FBYVAsUUFBUUEsS0FBS1EsVUFBTCxDQUFnQixJQUFoQixDQUFyQixDQUFoQjtBQUNBLE1BQU1kLFVBQVVTLE1BQU1JLE1BQU4sQ0FBYVAsUUFBUSxDQUFDQSxLQUFLUSxVQUFMLENBQWdCLElBQWhCLENBQXRCLENBQWhCOztBQUVBO0FBQ0FwQyxJQUFJc0IsUUFBUWUsS0FBUixFQUFKLEVBQXFCbkMsT0FBckIsRUFBOEJvQyxLQUE5QixDQUFvQ0MsS0FBS0MsUUFBUXhCLEtBQVIsQ0FBY3VCLENBQWQsQ0FBekMiLCJmaWxlIjoicHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgZ2l0IGZyb20gJ3NpbXBsZS1naXQvcHJvbWlzZSdcbmltcG9ydCBvcmEgZnJvbSAnb3JhJ1xuaW1wb3J0IG9wZW5Ccm93c2VyIGZyb20gJ29wbidcbmltcG9ydCB7IGlzc3VlQnJhbmNoUGF0dGVybiwgc2VhcmNoSXNzdWVUYWdCcmFuY2ggfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcbmltcG9ydCBpbnF1aXJlciBmcm9tICdpbnF1aXJlcidcblxuY29uc3QgcnVuID0gYXN5bmMgKGlzc3VlVGFnLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHNwaW5uZXIgPSBvcmEoKVxuXG4gIGNvbnN0IGJyYW5jaCA9IGlzc3VlVGFnID8gYXdhaXQgc2VhcmNoSXNzdWVUYWdCcmFuY2goaXNzdWVUYWcpIDogKGF3YWl0IGdpdCgpLnN0YXR1cygpKS5jdXJyZW50XG5cbiAgaWYgKCFicmFuY2gpIHtcbiAgICByZXR1cm4gc3Bpbm5lci5mYWlsKCdZb3UgbXVzdCBwcm92aWRlIGEgdmFsaWQgYnJhbmNoJylcbiAgfVxuXG4gIGlmICghYnJhbmNoLm1hdGNoKGlzc3VlQnJhbmNoUGF0dGVybikpIHtcbiAgICByZXR1cm4gc3Bpbm5lci5mYWlsKCdJbnZhbGlkIG9wZXJhdGlvbi4gWW91IGFyZSBub3Qgb24gYSBpc3N1ZSBicmFuY2gnKVxuICB9XG5cbiAgc3Bpbm5lci5zdGFydCgnUHVibGlzaGluZycpXG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBnaXQoKVxuICAgICAgLnNpbGVudCh0cnVlKVxuICAgICAgLnB1c2goY29uZmlnLnJlbW90ZSwgYnJhbmNoLCB7ICctLXNldC11cHN0cmVhbSc6IG51bGwgfSlcbiAgICBzcGlubmVyLnN1Y2NlZWQoJ1B1Ymxpc2hlZCcpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc3Bpbm5lci5pbmZvKCdBbm90aGVyIHZlcnNpb24gb2YgYnJhbmNoIGFscmVhZHkgcHVibGlzaGVkJylcbiAgICBjb25zdCBwdWJsaXNoID0gKGF3YWl0IGlucXVpcmVyLnByb21wdChbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdwdWJsaXNoJyxcbiAgICAgICAgbWVzc2FnZTogJ0RvIHlvdSB3YW50IGZvcmNlIHVwZGF0ZSBwdWJsaWNhdGlvbj8gKHkgb3IgbiknLFxuICAgICAgICB2YWxpZGF0ZTogYW5zd2VyID0+IFsneScsICduJ10uaW5jbHVkZXMoYW5zd2VyLnRvTG93ZXJDYXNlKCkpXG4gICAgICB9XG4gICAgXSkpWydwdWJsaXNoJ11cblxuICAgIGlmIChwdWJsaXNoID09PSAneScpIHtcbiAgICAgIGF3YWl0IGdpdCgpXG4gICAgICAgIC5zaWxlbnQodHJ1ZSlcbiAgICAgICAgLnB1c2goY29uZmlnLnJlbW90ZSwgYnJhbmNoLCB7ICctLXNldC11cHN0cmVhbSc6IG51bGwsICctLWZvcmNlJzogbnVsbCB9KVxuICAgICAgc3Bpbm5lci5zdWNjZWVkKCdQdWJsaXNoZWQnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3Bpbm5lci5mYWlsKFwiV29uJ3QgcHVibGlzaCBicmFuY2gsIGFub3RoZXIgdmVyc2lvbiBhbHJlYWR5IHB1Ymxpc2hlZFwiKVxuICAgIH1cbiAgfVxuXG4gIGlmICghb3B0aW9ucy5maW5kKHdvcmQgPT4gd29yZCA9PT0gJy0tbm8tcHInKSkge1xuICAgIG9wZW5Ccm93c2VyKGBodHRwczovL2dpdGh1Yi5jb20vd29ya3NoYXJlL2FscGFjYS9jb21wYXJlLyR7Y29uZmlnLm1haW5CcmFuY2h9Li4uJHticmFuY2h9P2V4cGFuZD0xYCwge1xuICAgICAgd2FpdDogZmFsc2VcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IHdvcmRzID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDIpXG5cbmNvbnN0IG9wdGlvbnMgPSB3b3Jkcy5maWx0ZXIod29yZCA9PiB3b3JkLnN0YXJ0c1dpdGgoJy0tJykpXG5jb25zdCBtZXNzYWdlID0gd29yZHMuZmlsdGVyKHdvcmQgPT4gIXdvcmQuc3RhcnRzV2l0aCgnLS0nKSlcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbnJ1bihtZXNzYWdlLnNoaWZ0KCksIG9wdGlvbnMpLmNhdGNoKGUgPT4gY29uc29sZS5lcnJvcihlKSlcbiJdfQ==