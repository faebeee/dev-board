import { getWidgetConfig } from '@/lib/get-widget-config';
import { getGithub } from '@/lib/gh';
import { GithubBranchListWidget } from '@/lib/types/widget';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams;
  const dashboardId = searchParams.get('dashboard');
  const widgetId = searchParams.get('widget');

  const config = await getWidgetConfig<GithubBranchListWidget>(dashboardId, widgetId);
  if (!config) {
    return notFound();
  }


  const response = await getGithub().rest.repos.listBranches({
    owner: config.config.owner,
    repo: config.config.repo,
    per_page: 100,
  });

  const branches = response.data;

  const extendedBranches = await Promise.all(
    branches
    .map((branch) => getGithub()
    .rest
    .repos
    .getBranch({
      owner: config.config.owner,
      repo: config.config.repo,
      branch: branch.name
    })
    .then((res) => (res.data))));

  return Response.json(extendedBranches);
}
