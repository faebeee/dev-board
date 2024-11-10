import {Suspense} from "react";
import {ReleaseHistory} from "@/containers/release-history";
import {MyPullRequests} from "@/containers/my-pull-requests";
import {MyJiraIssues} from "@/containers/my-jira-issues";
import {WorkflowHistory} from "@/containers/workflow-history";
import {Header} from "@/components/header";

export default async function Home() {
  const dashboard = await import('../config.json');

  const map = {
    'my-pull-requests': MyPullRequests,
    'my-jira-issues': MyJiraIssues,
    'workflow-run': WorkflowHistory,
    'release-history': ReleaseHistory,
  };

  return (
    <>
      <Header/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className={'grid grid-cols-3 gap-4'}>
            {dashboard.widgets.map(({config, id, widget}) => {
              // eslint-disable-next-line
              // @ts-ignore
              const Component = map[widget];
              return <Component {...config} key={id}/>
            })}
          </div>
        </div>
      </Suspense>
    </>
  );
}
