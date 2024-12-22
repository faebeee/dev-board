'use client';

import { GithubRepoStatsResponseEntry } from '@/app/api/github/stats/types';
import { LineChartWidget } from '@/lib/components/line-chart-widget';
import { Widget } from '@/lib/components/widget';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { GeneralApiData } from './general-api-data';
import { BasicWidgetProps } from './types';

export const GithubRepoStats: FC<BasicWidgetProps> = ({ title, dashboard, widget }) => {
  return <GeneralApiData<GithubRepoStatsResponseEntry[]>
    endpoint={`/api/github/stats?dashboard=${dashboard}&widget=${widget}`}
  >
    {(stats) => (<Widget footer={<SiGithub/>} title={title}>
      <LineChartWidget data={stats ?? []}/>
    </Widget>)}
  </GeneralApiData>;
};