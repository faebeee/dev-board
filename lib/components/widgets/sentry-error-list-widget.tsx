'use client';
import { SentryError } from '@/app/api/sentry/events/types';
import { Badge } from '@/lib/components/ui/badge';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/lib/components/widgets/types';
import { WorkflowItemStatus, WorkflowList } from '@/lib/components/workflows/workflow-list';
import { SiSentry } from '@icons-pack/react-simple-icons';
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
    {(events) => (<Widget title={title} footer={<SiSentry/>} description={`Total ${events?.length} events`}>
      <WorkflowList
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
        }))}/>
    </Widget>)}
  </GeneralApiData>;
};