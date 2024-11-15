"use client";

import {GeneralApiData} from "@/containers/general-api-data";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {ReleaseTimeline} from "@/components/releases/release-timeline";
import {Release} from "@/app/api/github/release/types";
import {GHBasicProps} from "@/containers/types";
import {FC} from "react";

export const ReleaseHistory: FC<GHBasicProps & { title: string }> = ({owner, repo, title}) => {

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