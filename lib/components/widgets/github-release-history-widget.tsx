"use client";

import {GeneralApiData} from "@/lib/components/widgets/general-api-data";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {ReleaseTimeline} from "@/lib/components/releases/release-timeline";
import {Release} from "@/app/api/github/release/types";
import {GHBasicProps} from "@/lib/components/widgets/types";
import {FC} from "react";

export const GithubReleaseHistoryWidget: FC<GHBasicProps & { title: string }> = ({owner, repo, title}) => {

  return <GeneralApiData<Release[]> endpoint={'/api/github/release'}
                                    fetchInit={{
                                      headers: {
                                        [GH_API_OWNER_HEADER]: owner,
                                        [GH_API_REPO_HEADER]: repo,
                                      }
                                    }}
  >
    {(releases) => (<ReleaseTimeline title={title} releases={releases ?? []}/>)}
  </GeneralApiData>;
}