"use client";

import {PrList} from "@/components/pull-requests/pr-list";
import {GeneralApiData} from "@/containers/general-api-data";
import {toast} from "sonner";
import {useGhContext} from "@/lib/context/gh-context";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {PullRequest} from "@/app/api/github/pr/types";

export const MyPullRequests = () => {
  const {owner, repo} = useGhContext()
  return <GeneralApiData<PullRequest[]> endpoint={'/api/github/pr'}
                                        fetchInit={{
                                          headers: {
                                            [GH_API_OWNER_HEADER]: owner,
                                            [GH_API_REPO_HEADER]: repo,
                                          }
                                        }}
                                        identifier={'key'}
                                        onNew={(newItems) => {
                                          toast(`${newItems?.length} new Pull-Requests`)
                                        }}>
    {(requests) => (<PrList pullRequest={requests ?? []} title={`My Pull-Requests ${requests?.length}`}/>)}
  </GeneralApiData>;
}