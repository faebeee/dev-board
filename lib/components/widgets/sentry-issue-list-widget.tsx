'use client';
import { SentryIssue } from '@/app/api/sentry/issues/types';
import { Badge } from '@/lib/components/ui/badge';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/lib/components/widgets/types';
import { WorkflowItemStatus, WorkflowList } from '@/lib/components/workflows/workflow-list';
import { SiSentry } from '@icons-pack/react-simple-icons';
import { Bug, Flag, Server } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';


const getStatus = (status: string): WorkflowItemStatus => {
  switch (status) {
    case 'error':
      return 'failure';
    default:
      return 'pending';
  }
};

export const SentryIssuesListWidget: FC<{title: string} & BasicWidgetProps> = ({ title, dashboard, widget }) => {
  return <GeneralApiData<SentryIssue[]> endpoint={`/api/sentry/issues?dashboard=${dashboard}&widget=${widget}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new error`);
    }}>
    {(issues, isLoading) => (
      <Widget title={title} loading={isLoading} footer={<SiSentry/>} description={`Total ${issues?.length} issues`}>
        <WorkflowList
          runs={(issues ?? []).map((issue) => ({
            url: issue.permalink,
            id: issue.id,
            status: getStatus(issue.level),
            subtitle: issue.metadata.value,
            title: issue.title,
            created_at: issue.lastSeen,
            event: <>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Server className="w-3 h-3"/>
                <span>{issue.platform}</span>
              </Badge>

              <Badge variant="outline" className="flex items-center space-x-1">
                <Flag className="w-3 h-3"/>
                <span>{issue.priority}</span>
              </Badge>

              <Badge variant="outline" className="flex items-center space-x-1">
                <Bug className="w-3 h-3"/>
                <span>{issue.count}</span>
              </Badge>
            </>
          }))}/>
      </Widget>)}
  </GeneralApiData>;
};

export default SentryIssuesListWidget;