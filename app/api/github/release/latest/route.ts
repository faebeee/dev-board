import {getGithub} from "@/lib/gh";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";

export async function GET(request: Request) {
  const {data} = await getGithub().rest.repos.listReleases({
    owner: request.headers.get(GH_API_OWNER_HEADER)!,
    repo: request.headers.get(GH_API_REPO_HEADER)!
  });

  return Response.json(data[0]);
}
