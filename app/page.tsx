import {GhContextProvider} from "@/lib/context/gh-context";
import {Suspense} from "react";
import {WorkflowList} from "@/components/workflows/workflow-list";
import {LatestRelease} from "@/containers/latest-release";
import {ReleaseHistory} from "@/containers/release-history";
import {MyPullRequests} from "@/containers/my-pull-requests";
import {MyJiraIssues} from "@/containers/my-jira-issues";

export default async function Home() {
  return (
    <GhContextProvider owner={process.env.GH_REPO_OWNER!} repo={process.env.GH_REPO!}>
      <Suspense>
        <div className={'grid grid-cols-3 gap-4'}>
          <MyPullRequests/>
          <MyJiraIssues/>
          <WorkflowList/>
          <LatestRelease/>
          <ReleaseHistory/>
        </div>
      </Suspense>
    </GhContextProvider>
  );
}
