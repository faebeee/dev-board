import { getWidgetConfig } from '@/lib/get-widget-config';
import { Widget } from '@/lib/types/widget';
import { NextRequest } from 'next/server';

export const getWidgetConfigFromRequest = async <T extends Widget>(request: NextRequest) => {
  const searchParams = request.nextUrl!.searchParams;
  const dashboardId = searchParams.get('dashboard');
  const widgetId = searchParams.get('widget');

  const config = await getWidgetConfig<T>(dashboardId, widgetId);
  return config;
};