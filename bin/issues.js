#!/usr/bin/env node
'use strict';

var _promise = require('simple-git/promise');

var _promise2 = _interopRequireDefault(_promise);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const run = async () => {
  const spinner = (0, _ora2.default)();
  const branches = await (0, _promise2.default)().branchLocal();

  branches.all.filter(branch => branch.startsWith(_config2.default.prefix)).map(branch => spinner.info(branch));
};

// eslint-disable-next-line no-console
run().catch(e => console.error(e));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pc3N1ZXMuanMiXSwibmFtZXMiOlsicnVuIiwic3Bpbm5lciIsImJyYW5jaGVzIiwiYnJhbmNoTG9jYWwiLCJhbGwiLCJmaWx0ZXIiLCJicmFuY2giLCJzdGFydHNXaXRoIiwiY29uZmlnIiwicHJlZml4IiwibWFwIiwiaW5mbyIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLE1BQU1BLE1BQU0sWUFBWTtBQUN0QixRQUFNQyxVQUFVLG9CQUFoQjtBQUNBLFFBQU1DLFdBQVcsTUFBTSx5QkFBTUMsV0FBTixFQUF2Qjs7QUFFQUQsV0FBU0UsR0FBVCxDQUFhQyxNQUFiLENBQW9CQyxVQUFVQSxPQUFPQyxVQUFQLENBQWtCQyxpQkFBT0MsTUFBekIsQ0FBOUIsRUFBZ0VDLEdBQWhFLENBQW9FSixVQUFVTCxRQUFRVSxJQUFSLENBQWFMLE1BQWIsQ0FBOUU7QUFDRCxDQUxEOztBQU9BO0FBQ0FOLE1BQU1ZLEtBQU4sQ0FBWUMsS0FBS0MsUUFBUUMsS0FBUixDQUFjRixDQUFkLENBQWpCIiwiZmlsZSI6Imlzc3Vlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5pbXBvcnQgZ2l0IGZyb20gJ3NpbXBsZS1naXQvcHJvbWlzZSdcbmltcG9ydCBvcmEgZnJvbSAnb3JhJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZydcblxuY29uc3QgcnVuID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBzcGlubmVyID0gb3JhKClcbiAgY29uc3QgYnJhbmNoZXMgPSBhd2FpdCBnaXQoKS5icmFuY2hMb2NhbCgpXG5cbiAgYnJhbmNoZXMuYWxsLmZpbHRlcihicmFuY2ggPT4gYnJhbmNoLnN0YXJ0c1dpdGgoY29uZmlnLnByZWZpeCkpLm1hcChicmFuY2ggPT4gc3Bpbm5lci5pbmZvKGJyYW5jaCkpXG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG5ydW4oKS5jYXRjaChlID0+IGNvbnNvbGUuZXJyb3IoZSkpXG4iXX0=