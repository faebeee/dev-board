import {Endpoints} from "@octokit/types";

export type RepoIssue = Endpoints['GET /repos/{owner}/{repo}/issues']['response']['data'][0]