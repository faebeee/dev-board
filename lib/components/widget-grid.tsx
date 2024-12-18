import { WidgetMounter } from '@/lib/components/widget-mounter';
import { Widget } from '@/lib/types/widget';
import { FC } from 'react';


export const WidgetGrid: FC<{widgets: Widget[], dashboard: string}> = ({ widgets, dashboard }) => {
  return <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'}>
    {widgets.map((widget) => {
      return <WidgetMounter widget={widget} dashboard={dashboard} key={widget.id}/>;
    })}
  </div>;
};