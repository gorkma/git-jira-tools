#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora';
import { requestBranch, searchIssueTagBranch } from './utils';
import config from './config';

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
    await git().deleteLocalBranch(branch)
    spinner.succeed('local branch removed')
}

run(process.argv[2]).catch(e => console.error(e));