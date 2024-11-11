import {Endpoints} from "@octokit/types";

export type RepoEvent = Endpoints['GET /repos/{owner}/{repo}/events']['response']['data'][0] & {
  created_at?: string;
  type?: string;
  payload: {
    ref?: string;
    title?: string;
    pull_request?: {
      title?: string;
      html_url?: string;
      base?: {
        ref: string;
      }
    }
    review?: {
      state?: string;
      html_url?: string
    }
  }
};