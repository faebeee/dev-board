'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { FC, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

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


export const WorkflowList: FC<{runs: WorkflowItem[], title: string, subtitle?: string, footer?: ReactNode}> = ({
  runs,
  title,
  subtitle,
  footer,
}) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {subtitle && <CardDescription>{subtitle}</CardDescription>}
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        <ul className="space-y-4">
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
        </ul>
      </ScrollArea>
    </CardContent>
    <CardFooter>
      {footer}
    </CardFooter>
  </Card>
    ;
};