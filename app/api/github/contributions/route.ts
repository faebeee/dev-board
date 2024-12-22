import { getWidgetConfig } from '@/lib/get-widget-config';
import { getGithub } from '@/lib/gh';
import { GithubCommitListWidget } from '@/lib/types/widget';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams;
  const dashboardId = searchParams.get('dashboard');
  const widgetId = searchParams.get('widget');

  const config = await getWidgetConfig<GithubCommitListWidget>(dashboardId, widgetId);
  if (!config) {
    return notFound();
  }

  const response = await getGithub().rest.repos.getContributorsStats({
    owner: config.config.owner,
    repo: config.config.repo,
  });

  const stats = response.data.reduce((newStats, userEntry) => {
    newStats.push({ name: userEntry.author!.login!, total: userEntry.total });
    return newStats;
  }, [] as {name: string, total: number}[]);

  return Response.json(stats);
}
