import {getJira} from "@/lib/jira";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams
  const project = searchParams.get('project') ?? ''
  const result = await getJira().projectVersions.getProjectVersions({
    projectIdOrKey: project,
    expand: 'body'
  })

  return Response.json(result.reverse().slice(0, 5));
}
