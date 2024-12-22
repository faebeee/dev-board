import { GithubRepoStatsResponse } from '@/app/api/github/stats/types';
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

  const stats = response.data;
  const statsPerWeekByUser = stats.reduce((newStats, userEntry) => {
    userEntry.weeks.forEach((week) => {
      newStats[week.w!] = {
        date: new Date(week.w! * 1000),
        add: (newStats[week.w!]?.add ?? 0) + week.a!,
        remove: (Math.abs((newStats[week.w!]?.remove ?? 0)) + week.d!) * -1,
      };
    });
    return newStats;
  }, {} as GithubRepoStatsResponse);


  return Response.json(Object.values(statsPerWeekByUser).slice(-50));
}
