import { GhRepoIssuesWidget } from '@/components/widgets/gh-repo-issues-widget';
import {FC} from "react";
import {GithubReleaseHistoryWidget} from "@/components/widgets/github-release-history-widget";
import {MyPullRequestsWidget} from "@/components/widgets/my-pull-requests-widget";
import {GithubWorkflowHistoryWidget} from "@/components/widgets/github-workflow-history-widget";
import {JiraIssueSearch} from "@/components/widgets/jira-search-widget";
import {Widget} from "@/types/widgets";
import {PullRequestsReviewWidget} from "@/components/widgets/pull-requests-review-widget";
import {GithubRepoEventsWidget} from "@/components/widgets/github-repo-events-widget";
import {JiraReleaseWidget} from "@/components/widgets/jira-release-widget";
import {AllPullRequestsWidget} from "@/components/widgets/all-pull-requests-widget";

const map = {
  'my-pull-requests': MyPullRequestsWidget,
  'pull-requests-to-review': PullRequestsReviewWidget,
  'workflow-run': GithubWorkflowHistoryWidget,
  'release-history': GithubReleaseHistoryWidget,
  'jira-search': JiraIssueSearch,
  'repo-events': GithubRepoEventsWidget,
  'jira-release-list': JiraReleaseWidget,
  'all-pull-requests': AllPullRequestsWidget,
  'github-issues': GhRepoIssuesWidget,
};


export const WidgetGrid: FC<{ widgets: Widget[] }> = ({widgets}) => {
  return <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3'}>
    {widgets.map(({config, id, widget}) => {
      // eslint-disable-next-line
      // @ts-ignore
      const Component = map[widget];
      // eslint-disable-next-line
      // @ts-ignore
      return <Component {...config} key={id}/>
    })}
  </div>
}