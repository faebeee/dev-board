'use client';

import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { FC, ReactNode } from 'react';

export type WorkflowItemStatus = 'completed' | 'failure' | 'running' | 'pending' | 'unknown'
export type WorkflowItem = {
  id: number | string
  url: string;
  status: WorkflowItemStatus;
  title: string;
  subtitle?: string;
  created_at?: string;
  event?: ReactNode
}


export const WorkflowList: FC<{runs: WorkflowItem[]}> = ({
  runs,
}) => {
  return <ul className="space-y-4">
    {runs.map((run) => (
      <li key={run.id}>
        <a href={run.url} target="_blank">
          <div className="flex  justify-between p-4 bg-muted rounded-lg flex-col lg:flex-row lg:items-center">
            <div className="flex items-start space-x-4">
              <div className="w-4">
                {run.status === 'completed' && <CheckCircle2 className="text-green-500"/>}
                {run.status === 'failure' && <XCircle className="text-red-500"/>}
                {run.status === 'running' && <Clock className="text-yellow-500 animate-spin"/>}
                {run.status === 'pending' && <Clock className="text-gray-500 animate-spin"/>}
                {run.status === 'unknown' && <Clock className="text-gray-500 animate-spin"/>}
              </div>
              <div className={'flex flex-col space-y-2 overflow-hidden'}>
                <div>
                  <h3 className="font-semibold break-words">
                    {run.title}
                  </h3>
                  {run.created_at && <p className="text-xs text-muted-foreground">
                    {new Date(run.created_at).toLocaleString()}
                  </p>}
                </div>

                <p className="text-sm text-muted-foreground break-words">
                  {run.subtitle}
                </p>

                {run.event && <div className="flex flex-row content-start items-center space-x-2">
                  {run.event}
                </div>}
              </div>
            </div>

          </div>
        </a>
      </li>
    ))}
  </ul>;
};