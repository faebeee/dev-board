import { AllPullRequestsWidget } from '@/lib/components/widgets/all-pull-requests-widget';
import { GhCommitsChartWidget } from '@/lib/components/widgets/gh-commits-chart-widget';
import { GhRepoCommitsWidget } from '@/lib/components/widgets/gh-commits-widget';
import { GhRepoIssuesWidget } from '@/lib/components/widgets/gh-repo-issues-widget';
import { GithubBranchesListWidget } from '@/lib/components/widgets/github-branches-list-widget';
import { GithubReleaseHistoryWidget } from '@/lib/components/widgets/github-release-history-widget';
import { GithubRepoEventsWidget } from '@/lib/components/widgets/github-repo-events-widget';
import { GithubWorkflowHistoryWidget } from '@/lib/components/widgets/github-workflow-history-widget';
import { JiraIssuesGaugeWidget } from '@/lib/components/widgets/jira-issues-gauge-widget';
import { JiraReleaseWidget } from '@/lib/components/widgets/jira-release-widget';
import { JiraIssueSearch } from '@/lib/components/widgets/jira-search-widget';
import { JiraSprintGaugeWidget } from '@/lib/components/widgets/jira-sprint-gauge-widget';
import { JiraStatsGaugeWidget } from '@/lib/components/widgets/jira-stats-gauge-widget';
import { MyPullRequestsWidget } from '@/lib/components/widgets/my-pull-requests-widget';
import { PullRequestsReviewWidget } from '@/lib/components/widgets/pull-requests-review-widget';
import { SentryErrorListWidget } from '@/lib/components/widgets/sentry-error-list-widget';
import { SentryIssuesListWidget } from '@/lib/components/widgets/sentry-issue-list-widget';
import { VercelDeploymentWidget } from '@/lib/components/widgets/vercel-deployment-widget';
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
  'github-branches': GithubBranchesListWidget,
  'jira-sprint-gauge': JiraSprintGaugeWidget,
  'jira-issues-gauge': JiraIssuesGaugeWidget,
  'jira-stats-gauge': JiraStatsGaugeWidget,
};

export const WidgetMounter: FC<{widget: Widget, dashboard: string}> = ({ widget, dashboard }) => {
  // eslint-disable-next-line
  // @ts-ignore
  const Component = map[widget.widget];
  if (!Component) {
    return <div key={widget.id}>Widget {widget.widget} not found</div>;
  }
  // eslint-disable-next-line
  // @ts-ignore
  return <div key={widget.id} className={`col-span-${widget.layout?.cols} empty:hidden`}>
    <Component {...widget.config}
      dashboard={dashboard}
      widget={widget.id}/></div>;
};