"use client";

import {GeneralApiData} from "@/containers/general-api-data";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {useGhContext} from "@/lib/context/gh-context";
import {ReleaseTimeline} from "@/components/releases/release-timeline";
import {Release} from "@/app/api/github/release/types";

export const ReleaseHistory = () => {
  const {owner, repo} = useGhContext()

  return <GeneralApiData<Release[]> endpoint={'/api/github/release'}
                                    fetchInit={{
                                      headers: {
                                        [GH_API_OWNER_HEADER]: owner,
                                        [GH_API_REPO_HEADER]: repo,
                                      }
                                    }}
  >
    {(releases) => (<ReleaseTimeline releases={releases ?? []}/>)}
  </GeneralApiData>;
}