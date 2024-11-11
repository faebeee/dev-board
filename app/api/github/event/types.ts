import {Endpoints} from "@octokit/types";

export type RepoEvent = Endpoints['GET /repos/{owner}/{repo}/events']['response']['data'][0];