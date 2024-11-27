import { getSentry } from '@/lib/get-sentry';
import { getWidgetConfigFromRequest } from '@/lib/get-widget-config-from-request';
import { SentryErrorsWidget } from '@/lib/types/widget';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const widgetConfig = await getWidgetConfigFromRequest<SentryErrorsWidget>(request);
  if (!widgetConfig) {
    return notFound();
  }
  const events = await getSentry(widgetConfig.config.org, widgetConfig.config.project).getIssues();
  return Response.json(events);
}
