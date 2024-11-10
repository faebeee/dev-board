import {getJira} from "@/lib/jira";
import {type NextRequest} from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams
  const query = searchParams.get('query') ?? ''

  const result = await getJira().issueSearch.searchForIssuesUsingJql({
    jql: query,
  })

  return Response.json(result.issues!)
}
