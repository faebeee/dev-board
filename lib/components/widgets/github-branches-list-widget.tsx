'use client';

import { RepoBranch } from '@/app/api/github/branches/types';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/lib/components/widgets/types';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { toast } from 'sonner';
import { BranchList } from '../branch-list/branch-list';

export const GithubBranchesListWidget: FC<BasicWidgetProps> = ({ title, widget, dashboard }) => {
  return <GeneralApiData<RepoBranch[]> endpoint={`/api/github/branches?dashboard=${dashboard}&widget=${widget}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new branch`);
    }}>
    {(branches, isLoading) => (<Widget loading={isLoading} footer={<SiGithub/>} title={title} description={`Total ${branches?.length} branches`}>
      <BranchList branches={(branches ?? []).map((branch) => ({
        name: branch.name,
        url: branch._links.html,
        lastCommit: {
          message: branch.commit?.commit.message,
          date: branch.commit?.commit.author?.date,
          author: {
            name: branch.commit?.commit.author?.name,
            avatar: branch.commit?.author?.avatar_url,
          },
        }
      }))}/>
    </Widget>)}
  </GeneralApiData>;
};
