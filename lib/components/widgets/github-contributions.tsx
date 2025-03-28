'use client';

import { GithubRepoContributionsResponse } from '@/app/api/github/contributions/types';
import { RadarChartWidget } from '@/lib/components/radar-chart-widget';
import { Widget } from '@/lib/components/widget';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { GeneralApiData } from './general-api-data';
import { BasicWidgetProps } from './types';

export const GithubContributions: FC<BasicWidgetProps> = ({ title, dashboard, widget }) => {
  return <GeneralApiData<GithubRepoContributionsResponse>
    endpoint={`/api/github/contributions?dashboard=${dashboard}&widget=${widget}`}
  >
    {(stats, isLoading) => (
      <Widget loading={isLoading} description={'Total commits per user'} footer={<SiGithub/>} title={title}>
        <RadarChartWidget data={stats ?? []} categories={['total']}/>
      </Widget>)}
  </GeneralApiData>;
};

export default GithubContributions;