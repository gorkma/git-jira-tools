#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora'
import { requestBranch, searchIssueTagBranch } from './utils'
import config from './config'
import inquirer from 'inquirer'

const run = async issueTag => {
  const spinner = ora()

  const branch = !issueTag ? await requestBranch() : await searchIssueTagBranch(issueTag)

  if (!branch) {
    return spinner.fail('Branch not found')
  }

  spinner.start('Removing remote branch')
  try {
    await git()
      .silent(true)
      .push(config.remote, `:${branch}`)
    spinner.succeed('Remote branch removed')
  } catch (error) {
    spinner.info(`Remote branch not found, pruning ${config.remote}`)
    await git().raw(['remote', 'prune', config.remote])
  }

  spinner.start('Removing local branch')

  const status = await git().status()
  const currentBranch = status.current

  if (currentBranch === branch) {
    spinner.info(`Removing current branch, moving to ${config.mainBranch}`)
    await git().checkout(config.mainBranch)
  }

  spinner.start('Removing local branch')
  try {
    await git()
      .silent(true)
      .deleteLocalBranch(branch)
    spinner.succeed('Local branch removed')
  } catch (error) {
    spinner.info('Branch not fully merged')
    const remove = (await inquirer.prompt([
      {
        name: 'remove',
        message: 'Are you sure you want to close it (y or n)',
        validate: answer => ['y', 'n'].includes(answer.toLowerCase())
      }
    ]))['remove']

    if (remove === 'y') {
      await git().raw(['branch', '-D', branch])
      spinner.succeed('Local branch removed')
    } else {
      return spinner.fail("Won't remove branch, not fully merged")
    }
  }
}

// eslint-disable-next-line no-console
run(process.argv[2]).catch(e => console.error(e))
