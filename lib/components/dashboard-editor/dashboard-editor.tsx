'use client';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WidgetPicker } from '@/lib/components/dashboard-editor/widget-picker';
import { GithubIssuesEditWidget } from '@/lib/components/dashboard-editor/widgets/github-issues-edit-widget';
import { JiraReleaseListEditWidget } from '@/lib/components/dashboard-editor/widgets/jira-release-list-edit-widget';
import { JiraSearchEditWidget } from '@/lib/components/dashboard-editor/widgets/jira-search-edit-widget';
import { Button } from '@/lib/components/ui/button';
import { Widget } from '@/lib/components/widget';
import { WidgetType } from '@/lib/config-schema';
import { Dashboard, Widget as WidgetConfig } from '@/lib/types/widget';
import { uniqueId } from 'lodash';
import { FC, JSXElementConstructor, useMemo, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const widgetMap: Record<WidgetType, JSXElementConstructor<any>> = {
  'jira-search': JiraSearchEditWidget,
  'jira-release-list': JiraReleaseListEditWidget,
  'github-issues': GithubIssuesEditWidget,
};

export const DashboardEditor: FC<{config: Dashboard[]}> = ({}) => {
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

  const updateWidget = (id: string, config: object) => {
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

  return <div>
    {showWidgetPicker && <WidgetPicker onAdd={onAddWidget} onClose={() => setShowWidgetPicker(false)}/>}

    <Tabs defaultValue="editor">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="editor">Editor</TabsTrigger>
        <TabsTrigger value="preview">JSON</TabsTrigger>
      </TabsList>
      <TabsContent value="editor">
        <Input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>

        <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'}>
          {widgets.map((widget) => {
            const Component = widgetMap[widget.widget];
            return <Component
              key={widget.id} {...widget}
              onRemove={removeWidget}
              onChange={updateWidget}/>;
          })}
          <Widget title={'Add Widget'}>
            <div className={'flex flex-1 items-center justify-center'}>
              <Button onClick={() => setShowWidgetPicker(true)}>Add Widget</Button>
            </div>
          </Widget>
        </div>
      </TabsContent>
      <TabsContent value="preview">
          <pre>
            {JSON.stringify(dashboard, null, 2)}
          </pre>
      </TabsContent>
    </Tabs>
  </div>;
};