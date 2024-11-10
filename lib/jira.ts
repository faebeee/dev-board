import {Version3Client} from "jira.js";

const client = new Version3Client({
  host: 'https://konova.atlassian.net',
  authentication: {
    basic: {
      email: 'gianini@konova.ch',
      apiToken: process.env.JIRA_ACCESS_TOKEN!,
    },
//    personalAccessToken: process.env.JIRA_ACCESS_TOKEN!,
  },
});

export const getJira = () => client;