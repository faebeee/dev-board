import { AllPullRequestsWidget } from '@/components/widgets/all-pull-requests-widget';
import { GhCommitsChartWidget } from '@/components/widgets/gh-commits-chart-widget';
import { GhRepoCommitsWidget } from '@/components/widgets/gh-commits-widget';
import { GhRepoIssuesWidget } from '@/components/widgets/gh-repo-issues-widget';
import { GithubReleaseHistoryWidget } from '@/components/widgets/github-release-history-widget';
import { GithubRepoEventsWidget } from '@/components/widgets/github-repo-events-widget';
import { GithubWorkflowHistoryWidget } from '@/components/widgets/github-workflow-history-widget';
import { JiraReleaseWidget } from '@/components/widgets/jira-release-widget';
import { JiraIssueSearch } from '@/components/widgets/jira-search-widget';
import { MyPullRequestsWidget } from '@/components/widgets/my-pull-requests-widget';
import { PullRequestsReviewWidget } from '@/components/widgets/pull-requests-review-widget';
import { SentryErrorListWidget } from '@/components/widgets/sentry-error-list-widget';
import { SentryIssuesListWidget } from '@/components/widgets/sentry-issue-list-widget';
import { VercelDeploymentWidget } from '@/components/widgets/vercel-deployment-widget';
import { Widget } from '@/lib/types/widget';
import { FC } from 'react';

const map = {
  'my-pull-requests': MyPullRequestsWidget,
  'pull-requests-to-review': PullRequestsReviewWidget,
  'workflow-run': GithubWorkflowHistoryWidget,
  'release-history': GithubReleaseHistoryWidget,
  'jira-search': JiraIssueSearch,
  'github-repo-events': GithubRepoEventsWidget,
  'jira-release-list': JiraReleaseWidget,
  'all-pull-requests': AllPullRequestsWidget,
  'github-issues': GhRepoIssuesWidget,
  'vercel-deployments': VercelDeploymentWidget,
  'github-commits': GhRepoCommitsWidget,
  'github-commits-charts': GhCommitsChartWidget,
  'sentry-errors': SentryErrorListWidget,
  'sentry-issues': SentryIssuesListWidget,
};


export const WidgetGrid: FC<{widgets: Widget[], dashboard: string}> = ({ widgets, dashboard }) => {
  return <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'}>
    {widgets.map(({ config, id, widget, layout }) => {
      // eslint-disable-next-line
      // @ts-ignore
      const Component = map[widget];
      if (!Component) {
        return <div key={id}>Widget {widget} not found</div>;
      }
      // eslint-disable-next-line
      // @ts-ignore
      return <div key={id} className={`col-span-${layout?.cols} empty:hidden`}><Component {...config} dashboard={dashboard} widget={id} /></div>;
    })}
  </div>;
};