import { getWidgetConfig } from '@/lib/get-widget-config';
import { getNewJira } from '@/lib/jira';
import { JiraStatsGaugeWidget } from '@/lib/types/widget';
import { get } from 'lodash';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams;
  const dashboardId = searchParams.get('dashboard');
  const widgetId = searchParams.get('widget');

  const config = await getWidgetConfig<JiraStatsGaugeWidget>(dashboardId, widgetId);
  if (!config) {
    return notFound();
  }

  const result = await getNewJira(config.config.host).issueSearch.searchForIssuesUsingJql({
    jql: config.config.jql,
  });

  const val = result.issues?.reduce((counts, issue) => {
    if (!get(issue, config.config.accessor)) {
      return counts;
    }
    counts[get(issue, config.config.accessor)] = (counts[get(issue, config.config.accessor)] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  return Response.json({ ...val });
}
