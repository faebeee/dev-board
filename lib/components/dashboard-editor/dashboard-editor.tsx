'use client';

import { Input } from '@/components/ui/input';
import { WidgetPicker } from '@/lib/components/dashboard-editor/widget-picker';
import { JiraSearchEditWidget } from '@/lib/components/dashboard-editor/widgets/jira-search-edit-widget';
import { Button } from '@/lib/components/ui/button';
import { Widget } from '@/lib/components/widget';
import { WidgetType } from '@/lib/config-schema';
import { Dashboard, Widget as WidgetConfig } from '@/lib/types/widget';
import { uniqueId } from 'lodash';
import { FC, useMemo, useState } from 'react';

const widgetMap: Record<WidgetType, () => JSX.Element> = {
  'jira-search': JiraSearchEditWidget
};

export const DashboardEditor: FC<{config: Dashboard[]}> = ({  }) => {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);

  const [title, setTitle] = useState('');
  const [id] = useState(uniqueId('dashboard'));
  const [showWidgetPicker, setShowWidgetPicker] = useState(false);

  const onAddWidget = (widgetType: WidgetType) => {
    setWidgets([
      ...widgets,
      {
        widget: widgetType,
        id: uniqueId(widgetType),
        config: {},
        layout: {
          cols: 1,
        }
      }
    ]);
    setShowWidgetPicker(false);
  };

  const dashboard: Dashboard = useMemo(() => ({
    type: 'grid',
    title,
    widgets: widgets,
    id,
  }), [title, widgets]);

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const updateWidget = (id: string, config: unknown) => {
    setWidgets(widgets.map((widget) => {
      if (widget.id === id) {
        return {
          ...widget,
          config: { ...widget.config, ...config },
        };
      }
      return widget;
    }));
  };

  return <>
    <Input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>

    {showWidgetPicker && <WidgetPicker onAdd={onAddWidget} onClose={() => setShowWidgetPicker(false)}/>}

    <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'}>
      {widgets.map((widget) => {
        const Component = widgetMap[widget.widget];
        return <Component key={widget.id} {...widget}
          onRemove={removeWidget}
          onChange={updateWidget}/>;
      })}
      <Widget title={'Add Widget'}>
        <div className={'flex flex-1 items-center justify-center'}>
          <Button onClick={() => setShowWidgetPicker(true)}>Add Widget</Button>
        </div>
      </Widget>
    </div>

    <pre>
      {JSON.stringify(dashboard, null, 2)}
    </pre>
  </>;
};