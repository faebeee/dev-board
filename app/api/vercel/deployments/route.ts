import { getVercel } from '@/lib/get-vercel';
import { getWidgetConfig } from '@/lib/get-widget-config';
import { VercelDeploymentWidget } from '@/lib/types/widget';
import { notFound } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl!.searchParams;
  const dashboardId = searchParams.get('dashboard');
  const widgetId = searchParams.get('widget');

  const config = await getWidgetConfig<VercelDeploymentWidget>(dashboardId, widgetId);
    console.log(dashboardId, widgetId);
  if (!config) {
    return notFound();
  }

  const res = await getVercel().deployments.getDeployments({
    app: config.config.app,
    projectId: config.config.projectId,
  });

  return Response.json(res.deployments);
}