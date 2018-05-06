#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora'
import config from './config'

const run = async () => {
  const spinner = ora()
  const branches = await git().branchLocal()

  branches.all.filter(branch => branch.startsWith(config.prefix)).map(branch => spinner.info(branch))
}

// eslint-disable-next-line no-console
run().catch(e => console.error(e))
