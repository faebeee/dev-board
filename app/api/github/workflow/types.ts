import {Endpoints} from "@octokit/types";

export type Workflow = Endpoints['GET /repos/{owner}/{repo}/actions/runs']['response']['data']['workflow_runs'][0];