import {getGithub} from "@/lib/gh";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";


export async function GET(request: Request) {
  const response = await getGithub().rest.pulls.list({
    owner: request.headers.get(GH_API_OWNER_HEADER)!,
    repo: request.headers.get(GH_API_REPO_HEADER)!
  });

  const prs = response.data;
  return Response.json(prs);
}
