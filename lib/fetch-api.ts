import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";

export const fetchApi = (input: string | URL | globalThis.Request,
                         init?: RequestInit) => {
  return fetch(input, init);
}

export const githubApiFetch = async (input: string | URL | globalThis.Request, owner: string, repo: string) => {
  const request = await fetch(input, {
    headers: {
      [GH_API_OWNER_HEADER]: owner,
      [GH_API_REPO_HEADER]: repo,
    }
  })

  return request.json();
}