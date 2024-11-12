"use client";

import {GeneralApiData} from "@/containers/general-api-data";
import {FC} from "react";
import {toast} from "sonner"
import {JiraReleaseList} from "@/components/jira-release-list";
import {JiraRelease as JiraReleaseType} from '@/app/api/jira/release/types';

export const JiraRelease: FC<{ title: string, project: string }> = ({title, project}) => {
  return <GeneralApiData<JiraReleaseType[]> endpoint={`/api/jira/release?project=${project}`}
                                            identifier={'key'}
                                            onNew={(newItems) => {
                                              toast(`${newItems?.length} new Issues`)
                                            }}>
    {(releases) => (<JiraReleaseList release={releases ?? []} title={title} project={project}/>)}
  </GeneralApiData>;
}