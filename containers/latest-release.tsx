"use client";

import {GeneralApiData} from "@/containers/general-api-data";
import {ReleaseCard} from "@/components/releases/release-card";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {useGhContext} from "@/lib/context/gh-context";
import {Release} from "@/app/api/github/release/types";

export const LatestRelease = () => {
  const {owner, repo} = useGhContext()

  return <GeneralApiData<Release> endpoint={'/api/github/release/latest'}
                                  fetchInit={{
                                    headers: {
                                      [GH_API_OWNER_HEADER]: owner,
                                      [GH_API_REPO_HEADER]: repo,
                                    }
                                  }}
  >
    {(release) => (
      <ReleaseCard url={release?.html_url ?? ''} version={release?.name ?? ''} changelog={release?.body ?? ''}/>)}
  </GeneralApiData>;
}