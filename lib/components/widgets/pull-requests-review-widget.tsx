"use client";

import {PrList} from "@/lib/components/pull-requests/pr-list";
import {GeneralApiData} from "@/lib/components/widgets/general-api-data";
import {toast} from "sonner";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {PullRequest} from "@/app/api/github/pr/types";
import {GHBasicProps} from "@/lib/components/widgets/types";
import {FC} from "react";

export const PullRequestsReviewWidget: FC<{ title: string } & GHBasicProps> = ({title, owner, repo}) => {
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
    {(requests) => (<PrList pullRequest={requests ?? []} title={title}/>)}
  </GeneralApiData>;
}