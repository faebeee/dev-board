"use client";

import {FC} from "react";
import {GeneralApiData} from "./general-api-data";
import {GHBasicProps} from "./types";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {toast} from "sonner";
import {RepoEventList} from "@/components/repo-event-list";
import {RepoEvent} from "@/app/api/github/event/types";

export const GithubRepoEventsWidget: FC<{ title: string } & GHBasicProps> = ({title, owner, repo}) => {
  return <GeneralApiData<RepoEvent[]> endpoint={'/api/github/event'}
                                      fetchInit={{
                                        headers: {
                                          [GH_API_OWNER_HEADER]: owner,
                                          [GH_API_REPO_HEADER]: repo,
                                        }
                                      }}
                                      identifier={'key'}
                                      onNew={(newItems) => {
                                        toast(`${newItems?.length} new events`)
                                      }}>
    {(events) => (<RepoEventList events={events ?? []} title={title}/>)}
  </GeneralApiData>;
}