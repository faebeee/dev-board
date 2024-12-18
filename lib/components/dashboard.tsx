import { WidgetCarousel } from '@/lib/components/widget-carousel';
import { WidgetGrid } from '@/lib/components/widget-grid';
import { DashboardType, Widget } from '@/lib/types/widget';
import { FC } from 'react';


export const Dashboard: FC<{widgets: Widget[], dashboardId: string, type?: DashboardType}> = ({
  widgets,
  dashboardId,
  type = 'grid'
}) => {
  if (type === 'carousel') {
    return <WidgetCarousel widgets={widgets} dashboardId={dashboardId}/>;
  }

  return <WidgetGrid widgets={widgets} dashboard={dashboardId}/>;
};