#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora'
import { issueBranchPattern } from './utils';
import config from './config';

const run = async () => {
    const spinner = ora()

    spinner.start('Saving stash')
    const status = await git().status()
    const currentBranch = status.current

    if (!currentBranch.match(issueBranchPattern)) {
        return spinner.fail('Invalid operation. You are not on a issue branch')
    }

    let stashName;
    if (status.files.length > 0) {
        stashName = `${currentBranch.match(issueBranchPattern)[0]}-WIP`
        await git().stash(['save', '--include-untracked', stashName])
        spinner.succeed('Stash saved')
    }

    spinner.start(`Updating ${config.mainBranch}`)
    await git().checkout(config.mainBranch)
    await git().pull()

    spinner.succeed(`${config.mainBranch} updated`)
        .start(`Rebasing ${config.mainBranch}`)
    await git().checkout(currentBranch)

    try {
        await git().silent(true).rebase([config.mainBranch])
    } catch (error) {
        const conflictStatus = await git().status()
        return spinner.warn('CONFLICT: Resolve all conflicts manually and continue rebase, conflicts:\n'
            + (conflictStatus.conflicted.map(path => `  - ${path}`).join('\n'))
        )
    }

    spinner.succeed(`${config.mainBranch} rebased`)

    if (stashName) {
        spinner.start('Reapplying stash')
        let rawStashes = await git().stash(['list'])
        const stashIndex = rawStashes.split('\n')
            .map((stash) => {
                const nameRegexp = /.*:(.*)$/

                let name = ''
                if (stash.match(nameRegexp)) {
                    name = stash.match(nameRegexp)[1].trim()
                }

                return name
            })
            .findIndex(name => name === stashName)

        await git().stash(['apply', `stash@{${stashIndex}}`])
        await git().stash(['drop', `stash@{${stashIndex}}`])
        spinner.succeed('Stash reapplied')
    }
}

run().catch(e => console.error(e))