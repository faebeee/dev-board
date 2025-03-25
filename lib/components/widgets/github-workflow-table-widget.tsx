'use client';

import { GH_API_OWNER_HEADER, GH_API_REPO_HEADER } from '@/app/api/github/types';
import { Workflow } from '@/app/api/github/workflow/types';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { toast } from 'sonner';
import { DetailItem, DetailList } from '../detail-list/detail-list';
import { GHBasicProps } from './types';


export const GithubWorkflowTableWidget: FC<GHBasicProps & {title: string, columns: string[]}> = ({
  owner,
  repo,
  title,
  columns = []
}) => {
  return <GeneralApiData<Workflow[]> endpoint={'/api/github/workflow'}
    identifier={'id'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new runs`);
    }}
    fetchInit={{
      headers: {
        [GH_API_OWNER_HEADER]: owner,
        [GH_API_REPO_HEADER]: repo,
      }
    }}
  >
    {(runs, isLoading) => (<Widget loading={isLoading} title={title} footer={<SiGithub/>}>
      <DetailList data={runs?.map((run) => ({
        ...run,
        id: 'run' + run.id,
        label: run.name!,
        status: run.conclusion,
        url: run.html_url,
        tag: run.event,
        date: run.run_started_at,
      } as DetailItem)) ?? []} columns={columns}/>
    </Widget>)}
  </GeneralApiData>;
};

export default GithubWorkflowTableWidget;