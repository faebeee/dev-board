import {Endpoints} from "@octokit/types";

export type Release = Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'][0];