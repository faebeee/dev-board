import {Endpoints} from "@octokit/types";

export type RepoBranch = Endpoints['GET /repos/{owner}/{repo}/branches/{branch}']['response']['data']