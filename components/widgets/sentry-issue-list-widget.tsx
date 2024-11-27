'use client';
import { SentryError } from '@/app/api/sentry/events/types';
import { SentryIssue } from '@/app/api/sentry/issues/types';
import { Badge } from '@/components/ui/badge';
import { GeneralApiData } from '@/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/components/widgets/types';
import { WorkflowItemStatus, WorkflowList } from '@/components/workflows/workflow-list';
import { Bug, Flag, GitBranch, Server, User } from 'lucide-react';
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
    {(issues) => (<WorkflowList title={title}
      subtitle={`Total ${issues?.length} issues`}
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
      }))}/>)}
  </GeneralApiData>;
};