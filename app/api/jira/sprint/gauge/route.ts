import { JiraSprintGaugeResponse } from '@/app/api/jira/sprint/gauge/types';
import { getWidgetConfig } from '@/lib/get-widget-config';
import { getNewJira } from '@/lib/jira';
import { JiraGaugeWidget } from '@/lib/types/widget';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest): Promise<JiraSprintGaugeResponse> {
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
    if (!issue.fields.status.name) {
      return counts;
    }
    counts[issue.fields.status.name] = (counts[issue.fields.status.name] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return Response.json({ ...val, total: result.issues?.length });
}
