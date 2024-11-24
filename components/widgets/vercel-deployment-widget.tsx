'use client';

import { GeneralApiData } from '@/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/components/widgets/types';
import { FC } from 'react';

export const VercelDeploymentWidget: FC<{title: string} & BasicWidgetProps> = ({
  title,
  dashboard,
  widget
}) => {
  return <GeneralApiData endpoint={`/api/vercel/deployments?dashboard=${dashboard}&widget=${widget}`}
    identifier={'key'}>
    {(issues) => (<div></div>)}
  </GeneralApiData>;
};