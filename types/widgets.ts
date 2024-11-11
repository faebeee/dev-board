export type WidgetComponent =
  'my-jira-issues'
  | 'my-pull-requests'
  | 'pull-requests-to-review'
  | 'jira-search'
  | 'workflow-run'
  | 'release-history'

export type Widget = {
  id: string;
  widget: WidgetComponent;
  config: object;
}

export type Dashboard = {
  title: string;
  id: string;
  widgets: Widget[]
}