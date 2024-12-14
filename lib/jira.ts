import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: process.env.JIRA_HOST!,
  authentication: {
    basic: {
      email: process.env.JIRA_USER_MAIL!,
      apiToken: process.env.JIRA_ACCESS_TOKEN!,
    },
  },
});

export const getJira = () => client;


export const getNewJira = (host: string) => new Version3Client({
  host,
  authentication: {
    basic: {
      email: process.env.JIRA_USER_MAIL!,
      apiToken: process.env.JIRA_ACCESS_TOKEN!,
    },
  },
});