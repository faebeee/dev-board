"use client";

import {JiraIssueList} from "@/components/issues/jira-issue-list";
import {GeneralApiData} from "@/containers/general-api-data";
import {Issue} from "jira.js/out/version3/models";
import {toast} from "sonner"

export const MyJiraIssues = () => {
  return <GeneralApiData<Issue[]> endpoint={'/api/jira/issues'} identifier={'key'}
                                  onNew={(newItems) => {
                                    toast(`${newItems?.length} new Issues`)
                                  }}>
    {(issues) => (<JiraIssueList issues={issues ?? []} title={`My Issues ${issues?.length}`}/>)}
  </GeneralApiData>;
}