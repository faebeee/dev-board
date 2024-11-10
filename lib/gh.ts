import {Octokit} from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GH_ACCESS_TOKEN
});

export const getGithub = () => octokit;