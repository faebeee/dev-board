import { WidgetType } from '@/lib/config-schema';
import { Widget } from '@/lib/types/widget';
import React, { FC } from 'react';
import { LoadingIndicator } from '../loading-indicator';

const map: Record<WidgetType, React.LazyExoticComponent<FC<any>>> = {
  'my-pull-requests': React.lazy(() => import('@/lib/components/widgets/my-pull-requests-widget')),
  'pull-requests-to-review': React.lazy(() => import('@/lib/components/widgets/pull-requests-review-widget')),
  'workflow-run': React.lazy(() => import('@/lib/components/widgets/github-workflow-history-widget')),
  'workflow-table': React.lazy(() => import('@/lib/components/widgets/github-workflow-table-widget')),
  'release-history': React.lazy(() => import('@/lib/components/widgets/github-release-history-widget')),
  'jira-search': React.lazy(() => import('@/lib/components/widgets/jira-search-widget')),
  'github-repo-events': React.lazy(() => import('@/lib/components/widgets/github-repo-events-widget')),
  'jira-release-list': React.lazy(() => import('@/lib/components/widgets/jira-release-widget')),
  'all-pull-requests': React.lazy(() => import('@/lib/components/widgets/all-pull-requests-widget')),
  'github-issues': React.lazy(() => import('@/lib/components/widgets/gh-repo-issues-widget')),
  'vercel-deployments': React.lazy(() => import('@/lib/components/widgets/vercel-deployment-widget')),
  'github-commits': React.lazy(() => import('@/lib/components/widgets/gh-commits-widget')),
  'github-commits-charts': React.lazy(() => import('@/lib/components/widgets/gh-commits-chart-widget')),
  'sentry-errors': React.lazy(() => import('@/lib/components/widgets/sentry-error-list-widget')),
  'sentry-issues': React.lazy(() => import('@/lib/components/widgets/sentry-issue-list-widget')),
  'github-branches': React.lazy(() => import('@/lib/components/widgets/github-branches-list-widget')),
  'jira-sprint-gauge': React.lazy(() => import('@/lib/components/widgets/jira-sprint-gauge-widget')),
  'jira-issues-gauge': React.lazy(() => import('@/lib/components/widgets/jira-issues-gauge-widget')),
  'jira-stats-gauge': React.lazy(() => import('@/lib/components/widgets/jira-stats-gauge-widget')),
  'github-stats': React.lazy(() => import('@/lib/components/widgets/github-repo-stats')),
  'github-contributions': React.lazy(() => import('@/lib/components/widgets/github-contributions')),
  'github-contributor-stats': React.lazy(() => import('@/lib/components/widgets/github-contributor-stats')),
};

export const WidgetMounter: FC<{widget: Widget, dashboard: string}> = ({ widget, dashboard }) => {
  // eslint-disable-next-line
  // @ts-ignore
  const Component = map[widget.widget];
  if (!Component) {
    return <div key={widget.id}>Widget {widget.widget} not found</div>;
  }
  return <div key={widget.id} className={`col-span-${widget.layout?.cols} empty:hidden`}>
    <React.Suspense fallback={<LoadingIndicator/>}>
      {/* eslint-disable-next-line*/}
      {/* @ts-ignore*/}
      <Component {...widget.config}
        dashboard={dashboard}
        widget={widget.id}/>
    </React.Suspense>
  </div>;
};