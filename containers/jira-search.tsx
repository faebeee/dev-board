"use client";

import {JiraIssueList} from "@/components/issues/jira-issue-list";
import {GeneralApiData} from "@/containers/general-api-data";
import {Issue} from "jira.js/out/version3/models";
import {FC} from "react";
import {toast} from "sonner"

export const JiraIssueSearch: FC<{ title: string, jql: string }> = ({title, jql}) => {
  return <GeneralApiData<Issue[]> endpoint={`/api/jira/search?query=${jql}`}
                                  identifier={'key'}
                                  onNew={(newItems) => {
                                    toast(`${newItems?.length} new Issues`)
                                  }}>
    {(issues) => (<JiraIssueList issues={issues ?? []} title={title}/>)}
  </GeneralApiData>;
}