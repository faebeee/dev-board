import {getGithub} from "@/lib/gh";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {getUser} from "@/lib/get-user";
import {uniqBy} from "lodash";


export async function GET(request: Request) {
  const response = await getGithub().rest.dependabot.listAlertsForRepo({
    owner: request.headers.get(GH_API_OWNER_HEADER)!,
    repo: request.headers.get(GH_API_REPO_HEADER)!,
  });

  console.log(response);


  return Response.json([]);
}
