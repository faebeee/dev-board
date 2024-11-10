import {getJira} from "@/lib/jira";

export async function GET() {
  const result = await getJira().issueSearch.searchForIssuesUsingJql({
    jql: 'assignee=currentUser() and status != "Done"',
  })

  return Response.json(result.issues)
}
