'use client';
import { SentryError } from '@/app/api/sentry/events/types';
import { Badge } from '@/components/ui/badge';
import { GeneralApiData } from '@/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/components/widgets/types';
import { WorkflowItemStatus, WorkflowList } from '@/components/workflows/workflow-list';
import { GitBranch } from 'lucide-react';
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

export const SentryErrorListWidget: FC<{title: string} & BasicWidgetProps> = ({ title, dashboard, widget }) => {
  return <GeneralApiData<SentryError[]> endpoint={`/api/sentry/events?dashboard=${dashboard}&widget=${widget}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new error`);
    }}>
    {(events) => (<WorkflowList title={title}
      subtitle={`Total ${events?.length} events`}
      runs={(events ?? []).map((event) => ({
        url: event.id,
        id: event.eventID,
        status: getStatus(event['event.type']),
        subtitle: event.title,
        title: event.metadata.type,
        created_at: event.dateCreated,
        event: <>
          <Badge variant="outline" className="flex items-center space-x-1">
            <GitBranch className="w-3 h-3"/>
            <span>{event.platform}</span>
          </Badge>
        </>
      }))}/>)}
  </GeneralApiData>;
};