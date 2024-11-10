import {getJira} from "@/lib/jira";

export async function GET(request: Request) {
  const searchParams = request.nextUrl!.searchParams
  const query = searchParams.get('query')

  const result = await getJira().issueSearch.searchForIssuesUsingJql({
    jql: query,
  })

  return Response.json(result.issues)
}
