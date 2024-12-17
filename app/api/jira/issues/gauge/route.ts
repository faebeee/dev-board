import { getWidgetConfig } from '@/lib/get-widget-config';
import { getNewJira } from '@/lib/jira';
import { JiraGaugeWidget } from '@/lib/types/widget';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams;
  const dashboardId = searchParams.get('dashboard');
  const widgetId = searchParams.get('widget');

  const config = await getWidgetConfig<JiraGaugeWidget>(dashboardId, widgetId);
  if (!config) {
    return notFound();
  }

  const result = await getNewJira(config.config.host).issueSearch.searchForIssuesUsingJql({
    jql: config.config.jql,
  });

  const val = result.issues?.reduce((counts, issue) => {
    if (!issue.fields.assignee?.displayName) {
      return counts;
    }
    counts[issue.fields.assignee.displayName] = (counts[issue.fields.assignee.displayName] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return Response.json({ ...val });
}
