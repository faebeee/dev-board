import {FC} from "react";
import {ReleaseHistory} from "@/containers/release-history";
import {MyPullRequests} from "@/containers/my-pull-requests";
import {MyJiraIssues} from "@/containers/my-jira-issues";
import {WorkflowHistory} from "@/containers/workflow-history";
import {JiraIssueSearch} from "@/containers/jira-search";
import {Widget} from "@/types/widgets";
import {PullRequestsReview} from "@/containers/pull-requests-review";

const map = {
  'my-pull-requests': MyPullRequests,
  'pull-requests-to-review': PullRequestsReview,
  'my-jira-issues': MyJiraIssues,
  'workflow-run': WorkflowHistory,
  'release-history': ReleaseHistory,
  'jira-search': JiraIssueSearch,
};


export const WidgetGrid: FC<{ widgets: Widget[] }> = ({widgets}) => {
  return <div className={'grid grid-cols-3 gap-4'}>
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