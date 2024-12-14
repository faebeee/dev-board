'use client';

import { JiraSprintGaugeResponse } from '@/app/api/jira/sprint/gauge/types';
import { GaugeWidget } from '@/components/gauge-widget';
import { Widget } from '@/components/widget';
import { GeneralApiData } from '@/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/components/widgets/types';
import { SiJira } from '@icons-pack/react-simple-icons';
import { FC } from 'react';

export const JiraSprintGaugeWidget: FC<BasicWidgetProps & {categories:string[]}> = ({ categories, title, widget, dashboard }) => {
  return <GeneralApiData<JiraSprintGaugeResponse>
    endpoint={`/api/jira/sprint/gauge?dashboard=${dashboard}&widget=${widget}`}
    identifier={'key'}
  >
    {(response) => (<Widget footer={<SiJira/>} title={title}>
      <GaugeWidget data={response ?? {}} categories={categories}/>
    </Widget>)}
  </GeneralApiData>;
};
