'use client';

import { Badge } from '@/lib/components/ui/badge';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/lib/components/widgets/types';
import { WorkflowItemStatus, WorkflowList } from '@/lib/components/workflows/workflow-list';
import { SiVercel } from '@icons-pack/react-simple-icons';
import { Deployments } from '@vercel/sdk/models/operations/getdeployments';
import { GitBranch, User } from 'lucide-react';
import { FC } from 'react';


const getStatus = (status: Deployments['state']): WorkflowItemStatus => {
  switch (status) {
    case 'READY':
      return 'completed';
    case 'ERROR':
      return 'failure';
    case 'BUILDING':
      return 'running';
    case 'INITIALIZING':
      return 'running';
    case 'QUEUED':
      return 'pending';
    case 'CANCELED':
      return 'failure';
    case 'DELETED':
      return 'failure';
    default:
      return 'pending';
  }
};


export const VercelDeploymentWidget: FC<{title: string} & BasicWidgetProps> = ({
  title,
  dashboard,
  widget
}) => {
  return <GeneralApiData<Deployments[]> endpoint={`/api/vercel/deployments?dashboard=${dashboard}&widget=${widget}`}
    identifier={'uid'}>
    {(runs, isLoading) => (<Widget title={title} footer={<SiVercel/>} loading={isLoading}>
      <WorkflowList
        runs={(runs ?? []).map((run) => ({
          url: run.inspectorUrl!,
          id: run.uid,
          status: getStatus(run.state),
          subtitle: run.meta?.githubCommitMessage,
          title: run.name,
          created_at: run.createdAt ? new Date(run.createdAt).toISOString() : undefined,
          event: <>
            <Badge variant="outline" className="flex items-center space-x-1">
              <GitBranch className="w-3 h-3"/>
              <span>{run.meta?.githubCommitRef}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center space-x-1">
              <User className="w-3 h-3"/>
              <span>{run.creator.username}</span>
            </Badge>
          </>
        }))}/>
    </Widget>)}
  </GeneralApiData>;
};

export default VercelDeploymentWidget;