import { WidgetCarousel } from '@/components/widget-carousel';
import { WidgetGrid } from '@/components/widget-grid';
import { Widget } from '@/lib/types/widget';
import { FC } from 'react';


export const Dashboard: FC<{widgets: Widget[], dashboardId: string, type?: 'grid' | 'carouse;'}> = ({
  widgets,
  dashboardId,
  type = 'grid'
}) => {
  if (type === 'carousel') {
    return <WidgetCarousel widgets={widgets} dashboardId={dashboardId}/>;
  }

  return <WidgetGrid widgets={widgets} dashboard={dashboardId}/>;
};