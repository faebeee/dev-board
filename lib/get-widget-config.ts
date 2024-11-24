import { getConfig } from '@/lib/get-config';

export const getWidgetConfig = async <T>(dashboardId?: string | null, widgetId?: string | null): Promise<T | null> => {
  if (!widgetId || !dashboardId) {
    return null;
  }

  const config = await getConfig();
  const dashboard = config?.find(dashboard => dashboard.id === dashboardId);
  if (!dashboard) {
    return null;
  }

  return dashboard.widgets?.find(widget => widget.id === widgetId);
};