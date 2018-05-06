#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora'
import openBrowser from 'opn'
import { issueBranchPattern, searchIssueTagBranch } from './utils'
import config from './config'

const run = async issueTag => {
  const spinner = ora()

  const branch = issueTag ? await searchIssueTagBranch(issueTag) : (await git().status()).current

  if (!branch) {
    return spinner.fail('You must provide a valid branch')
  }

  if (!branch.match(issueBranchPattern)) {
    return spinner.fail('Invalid operation. You are not on a issue branch')
  }

  spinner.start('Publishing')
  await git().push(config.remote, branch, { '--set-upstream': null })
  spinner.succeed('Published')
  openBrowser(`https://github.com/workshare/alpaca/compare/${config.mainBranch}...${branch}?expand=1`, { wait: false })
}

// eslint-disable-next-line no-console
run(process.argv[2]).catch(e => console.error(e))
