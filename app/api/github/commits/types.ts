import {Endpoints} from "@octokit/types";

export type GithubCommit = Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][0]