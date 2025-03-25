'use client';

import { PullRequest } from '@/app/api/github/pr/types';
import { GH_API_OWNER_HEADER, GH_API_REPO_HEADER } from '@/app/api/github/types';
import { PrList } from '@/lib/components/pull-requests/pr-list';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { GHBasicProps } from '@/lib/components/widgets/types';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { toast } from 'sonner';

export const AllPullRequestsWidget: FC<{title: string} & GHBasicProps> = ({ title, owner, repo }) => {
  return <GeneralApiData<PullRequest[]> endpoint={'/api/github/pr/all'}
    fetchInit={{
      headers: {
        [GH_API_OWNER_HEADER]: owner,
        [GH_API_REPO_HEADER]: repo,
      }
    }}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new Pull-Requests`);
    }}>
    {(requests, isLoading) => (<Widget footer={<SiGithub/>} title={title}
        loading={isLoading}
        description={`Total ${requests?.length} Pull-Requests`}>
        <PrList pullRequest={requests ?? []}/>
      </Widget>
    )}
  </GeneralApiData>;
};

export default AllPullRequestsWidget;