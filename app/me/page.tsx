import {MyJiraIssues} from "@/containers/my-jira-issues";
import {MyPullRequests} from "@/containers/my-pull-requests";
import {GhContextProvider} from "@/lib/context/gh-context";
import {Suspense} from "react";

export default async function Home() {
  return (<GhContextProvider owner={process.env.GH_REPO_OWNER!} repo={process.env.GH_REPO!}>
      <Suspense>
        <div className={'grid grid-cols-2 gap-4'}>
          <MyPullRequests/>
          <MyJiraIssues/>
        </div>
      </Suspense>
    </GhContextProvider>
  );
}
