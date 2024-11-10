"use client";

import {GeneralApiData} from "@/containers/general-api-data";
import {GH_API_OWNER_HEADER, GH_API_REPO_HEADER} from "@/app/api/github/types";
import {useGhContext} from "@/lib/context/gh-context";
import {Workflow} from "@/app/api/github/workflow/types";
import {WorkflowList} from "@/components/workflows/workflow-list";
import {toast} from "sonner";

export const WorkflowHistory = () => {
  const {owner, repo} = useGhContext()

  return <GeneralApiData<Workflow[]> endpoint={'/api/github/workflow'}
                                     identifier={'id'}
                                     onNew={(newItems) => {
                                       toast(`${newItems?.length} new runs`)
                                     }}
                                     fetchInit={{
                                       headers: {
                                         [GH_API_OWNER_HEADER]: owner,
                                         [GH_API_REPO_HEADER]: repo,
                                       }
                                     }}
  >
    {(runs) => (<WorkflowList runs={runs ?? []}/>)}
  </GeneralApiData>;
}