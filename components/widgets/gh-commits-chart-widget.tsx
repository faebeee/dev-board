'use client';

import { GithubCommit } from '@/app/api/github/commits/types';
import { GithubCommitsChart } from '@/components/commits/github-commits-chart';
import { Widget } from '@/components/widget';
import { GeneralApiData } from '@/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/components/widgets/types';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { toast } from 'sonner';

export const GhCommitsChartWidget: FC<{title: string} & BasicWidgetProps> = ({ title, dashboard, widget }) => {
  return <GeneralApiData<GithubCommit[]> endpoint={`/api/github/commits?dashboard=${dashboard}&widget=${widget}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new Issues`);
    }}>
    {(commits) => (<Widget footer={<SiGithub/>} title={title}>
      <GithubCommitsChart commits={commits ?? []}/>
    </Widget>)}
  </GeneralApiData>;
};