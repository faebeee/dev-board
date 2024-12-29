'use client';

import { JiraRelease as JiraReleaseType } from '@/app/api/jira/release/types';
import { JiraReleaseList } from '@/lib/components/jira-release-list';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { SiJira } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { toast } from 'sonner';

export const JiraReleaseWidget: FC<{title: string, project: string}> = ({ title, project }) => {
  return <GeneralApiData<JiraReleaseType[]> endpoint={`/api/jira/release?project=${project}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new Issues`);
    }}>
    {(releases, isLoading) => (
      <Widget title={title} footer={<SiJira/>} description={'Click on a release to open it in Jira'}
        loading={isLoading}>
        <JiraReleaseList release={releases ?? []} project={project}/>
      </Widget>)}
  </GeneralApiData>;
};