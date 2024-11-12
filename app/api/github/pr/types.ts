import {RestEndpointMethodTypes} from "@octokit/rest";
import {Endpoints} from "@octokit/types";

export type PullRequest = Endpoints['GET /repos/{owner}/{repo}/pulls']['response']['data'][0];
export type PullRequestReview = RestEndpointMethodTypes["pulls"]["listReviews"]["response"]['data'][0];