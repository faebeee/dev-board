import {getGithub} from "@/lib/gh";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {getUser} from "@/lib/get-user";
import {uniqBy} from "lodash";


export async function GET(request: Request) {
  const response = await getGithub().rest.pulls.list({
    owner: request.headers.get(GH_API_OWNER_HEADER)!,
    repo: request.headers.get(GH_API_REPO_HEADER)!
  });

  const prs = response.data;
  const user = await getUser();

  const mineToReview = prs.filter((pr) => pr.requested_reviewers?.some((reviewer) => reviewer.id === user.id));
  const assignedToMe = prs.filter((pr) => pr.assignees?.some((assigned) => assigned.id === user.id));

  return Response.json(uniqBy([...mineToReview, ...assignedToMe], (pr) => pr.id));
}
