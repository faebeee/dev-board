'use client';

import { GithubRepoStatsResponseEntry } from '@/app/api/github/stats/types';
import { RadarChartWidget } from '@/lib/components/radar-chart-widget';
import { Widget } from '@/lib/components/widget';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { GeneralApiData } from './general-api-data';
import { BasicWidgetProps } from './types';

export const GithubContributions: FC<BasicWidgetProps> = ({ title, dashboard, widget }) => {
  return <GeneralApiData<GithubRepoStatsResponseEntry>
    endpoint={`/api/github/contributions?dashboard=${dashboard}&widget=${widget}`}
  >
    {(stats) => (<Widget description={'Total commits per user'} footer={<SiGithub/>} title={title}>
      <RadarChartWidget title={title} data={stats ?? []} categories={['total']}/>
    </Widget>)}
  </GeneralApiData>;
};