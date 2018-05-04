#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora';
import { requestBranch, searchIssueTagBranch } from './utils';
import config from './config';
import inquirer from 'inquirer';

const run = async (issueTag) => {
  const spinner = ora()

  const branch = !issueTag
    ? await requestBranch()
    : await searchIssueTagBranch(issueTag)

  if (!branch) {
    return spinner.fail('Branch not found');
  }

  spinner.start('removing remote branch')
  try {
    await git().silent(true).push(config.remote, `:${branch}`)
    spinner.succeed('remote branch removed')
  } catch (error) {
    spinner.info(`remote branch not found, pruning ${config.remote}`)
    await git().raw(['remote', 'prune', config.remote])
  }

  spinner.start('removing local branch')

  const status = await git().status()
  const currentBranch = status.current

  if (currentBranch === branch) {
    spinner.info(`removing current branch, moving to ${config.mainBranch}`)
    await git().checkout(config.mainBranch)
  }

  spinner.start('removing local branch')
  try {
    await git().silent(true).deleteLocalBranch(branch)
    spinner.succeed('local branch removed')
  } catch (error) {
    spinner.info('branch not fully merged')
    const remove = (await inquirer.prompt([{
      name: 'remove',
      message: 'are you sure you want to close it (y or n)',
      validate: answer => ['y', 'n'].includes(answer.toLowerCase())
    }]))['remove']

    if (remove === 'y') {
      await git().raw(['branch', '-D', branch])
      spinner.succeed('local branch removed')
    } else {
      return spinner.fail('Won\'t remove branch, not fully merged');
    }
  }
}

run(process.argv[2]).catch(e => console.error(e));