#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora'
import openBrowser from 'opn'
import { issueBranchPattern, searchIssueTagBranch } from './utils'
import config from './config'
import inquirer from 'inquirer'

const run = async (issueTag, options) => {
  const spinner = ora()

  const branch = issueTag ? await searchIssueTagBranch(issueTag) : (await git().status()).current

  if (!branch) {
    return spinner.fail('You must provide a valid branch')
  }

  if (!branch.match(issueBranchPattern)) {
    return spinner.fail('Invalid operation. You are not on a issue branch')
  }

  spinner.start('Publishing')

  try {
    await git()
      .silent(true)
      .push(config.remote, branch, { '--set-upstream': null })
    spinner.succeed('Published')
  } catch (error) {
    spinner.info('Another version of branch already published')
    const publish = (await inquirer.prompt([
      {
        name: 'publish',
        message: 'Do you want force update publication? (y or n)',
        validate: answer => ['y', 'n'].includes(answer.toLowerCase())
      }
    ]))['publish']

    if (publish === 'y') {
      await git()
        .silent(true)
        .push(config.remote, branch, { '--set-upstream': null, '--force': null })
      spinner.succeed('Published')
    } else {
      return spinner.fail("Won't publish branch, another version already published")
    }
  }

  if (!options.find(word => word === '--no-pr')) {
    openBrowser(`https://github.com/workshare/alpaca/compare/${config.mainBranch}...${branch}?expand=1`, {
      wait: false
    })
  }
}

const words = process.argv.slice(2)

const options = words.filter(word => word.startsWith('--'))
const message = words.filter(word => !word.startsWith('--'))

// eslint-disable-next-line no-console
run(message.shift(), options).catch(e => console.error(e))
