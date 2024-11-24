import { getConfig } from '@/lib/get-config';
import { Widget } from '@/lib/types/widget';

export const getWidgetConfig = async <T extends Widget>(dashboardId?: string | null, widgetId?: string | null): Promise<T | null> => {
  if (!widgetId || !dashboardId) {
    return null;
  }

  const config = await getConfig();
  const dashboard = config?.find(dashboard => dashboard.id === dashboardId);
  if (!dashboard || !dashboard.widgets) {
    return null;
  }

  return ((dashboard.widgets.find(widget => widget.id === widgetId)) ?? null) as T | null;
};