#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora';
import { issueBranchPattern } from './utils';

const run = async (commitMessage) => {
    const spinner = ora();

    if (commitMessage === '') {
        return spinner.fail('You must provide a commit message')
    }

    const currentBranch = (await git().status()).current

    if (!currentBranch.match(issueBranchPattern)) {
        return spinner.fail('Invalid operation. You are not on a issue branch')
    }

    spinner.start('committing')
    const issueTag = currentBranch.match(issueBranchPattern)[0]
    await git().raw(['commit', '-m', `${issueTag} ${commitMessage}`])

    spinner.succeed('Commited')
};

const [node, command, ...message] = process.argv

run(message.join(' ')).catch(e => console.error(e));