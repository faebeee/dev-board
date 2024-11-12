import {getGithub} from "@/lib/gh";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";


export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
  const prId = (await params).id;

  const response = await getGithub().rest.pulls.listReviews({
    owner: request.headers.get(GH_API_OWNER_HEADER)!,
    repo: request.headers.get(GH_API_REPO_HEADER)!,
    pull_number: parseInt(prId)
  });

  const prs = response.data;
  return Response.json(prs);
}
