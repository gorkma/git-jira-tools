import dotenv from 'dotenv'
import ora from 'ora';

dotenv.load()

const config = {
    prefix: process.env.JG_TOOLS_PREFIX,
    mainBranch: process.env.JG_TOOLS_MAIN_BRANCH || 'master',
    branchSeparator: process.env.JG_TOOLS_BRANCH_SEPARATOR || '-',
    remote: process.env.REMOTE || 'origin',
}

if (!process.env.JG_TOOLS_PREFIX) {
    ora().fail('You must configure jira-git-tools. Add mandatory "prefix" variable to your environment')
}

export default config