'use client';

import { RepoEvent } from '@/app/api/github/event/types';
import { GH_API_OWNER_HEADER, GH_API_REPO_HEADER } from '@/app/api/github/types';
import { RepoEventList } from '@/lib/components/repo-event-list';
import { Widget } from '@/lib/components/widget';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { toast } from 'sonner';
import { GeneralApiData } from './general-api-data';
import { GHBasicProps } from './types';

export const GithubRepoEventsWidget: FC<{title: string} & GHBasicProps> = ({ title, owner, repo }) => {
  return <GeneralApiData<RepoEvent[]> endpoint={'/api/github/event'}
    fetchInit={{
      headers: {
        [GH_API_OWNER_HEADER]: owner,
        [GH_API_REPO_HEADER]: repo,
      }
    }}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new events`);
    }}>
    {(events, isLoading) => (<Widget footer={<SiGithub/>} loading={isLoading} title={title}
      description={'Showing the latest GitHub repository events'}>
      <RepoEventList events={events ?? []}/>
    </Widget>)}
  </GeneralApiData>;
};