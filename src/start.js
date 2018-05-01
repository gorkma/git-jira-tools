#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora';
import { searchIssueTagBranch } from './utils';
import config from './config';

const run = async (issueTag, issueName, options) => {
    const spinner = ora()

    if (await searchIssueTagBranch(issueTag)) {
        return spinner.fail('An issue with the same tag already started')
    }

    if (!issueName) {
        return spinner.fail('You must provide an issue name')
    }

    if ((await git().status()).files.length > 0) {
        return spinner.fail('Work in progress save or stash it before starting a new issue')
    }

    if (options.find(word => word === '--from-current' || word === '--fc')) {
        spinner.info('starting from current branch')
    } else {
        spinner.info(`starting from ${config.mainBranch} (provide "--from-current" or "--fc" to start from current branch)`)
        spinner.start(`updating ${config.mainBranch}`)
        await git().checkout(config.mainBranch)
        await git().pull()
        spinner.succeed(`${config.mainBranch} updated`)
    }

    spinner.start('creating branch')
    await git().checkoutLocalBranch(`${config.prefix}${issueTag}${config.branchSeparator}${issueName}`)
    spinner.succeed('branch created')
}

const [node, command, ...words] = process.argv

const options = words.filter(word => word.startsWith('--'))
const message = words.filter(word => !word.startsWith('--'))

run(message.shift(), message.join(config.branchSeparator).toLowerCase(), options).catch(e => console.error(e));