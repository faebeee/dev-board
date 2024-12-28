'use client';

import { Avatar } from '@/lib/components/avatar';
import { Badge } from '@/lib/components/ui/badge';
import { useJiraIssueHightlightContext } from '@/lib/context/jira-issue-hightlight-provider';
import { clsx } from 'clsx';
import { CheckCircle2, Circle, Clock, Flag, MessageCircleQuestion } from 'lucide-react';
import { FC, ReactNode } from 'react';

export type IssueStatus = 'Open' | 'In Progress' | 'Done'
export type IssuePrio = 'Low' | 'Medium' | 'High'
export type Issue = {
  id: number | string
  key: string | number;
  status?: IssueStatus;
  prio?: IssuePrio;
  url?: string;
  assignee?: {avatar?: string; name?: string;}
  creator?: {avatar?: string; name?: string;}
  summary: string;
}


const getStatusIcon = (status: IssueStatus) => {
  switch (status) {
    case 'Open':
      return <Circle className="h-5 w-5 text-gray-400" aria-hidden="true"/>;
    case 'In Progress':
      return <Clock className="h-5 w-5 text-blue-500" aria-hidden="true"/>;
    case 'Done':
      return <CheckCircle2 className="h-5 w-5 text-green-500" aria-hidden="true"/>;
    default:
      return <MessageCircleQuestion className="h-5 w-5 text-gray-400" aria-hidden="true"/>;
  }
};

const getPriorityBadge = (priority: IssuePrio) => {
  const colors: Record<string, string> = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800'
  };

  return (
    <Badge variant="outline" className={`${priority ? colors[priority] : 'bg-gray-200 text-gray-900'} ml-2`}>
      <Flag className="h-3 w-3 mr-1" aria-hidden="true"/>
      {priority}
    </Badge>
  );
};

export const IssueList: FC<{issues: Issue[], title: ReactNode, footer?: ReactNode, className?: string}> = ({
  issues,
}) => {
  const jiraIssueHightlightContext = useJiraIssueHightlightContext();

  return <ul className="space-y-4" role="list">
    {issues.map((task) => (<div key={task.id}>
        <a target="_blank" href={task.url}
          onMouseOver={() => jiraIssueHightlightContext.setActive(task.key.toString())}
          onMouseOut={() => jiraIssueHightlightContext.setActive(null)}
        >
          <li
            className={clsx('flex items-center space-x-4 rounded-md border p-4 transition-opacity', {
              ['opacity-25']: !!jiraIssueHightlightContext.active && jiraIssueHightlightContext.active !== task.key.toString(),
              ['opacity-1 bg-accent']: jiraIssueHightlightContext.active === task.key.toString(),
            })}>
            <Avatar className="h-10 w-10"
              src={task.assignee?.avatar}
              name={task.assignee?.name ?? '?'}/>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {task.summary}
                </p>
                {task.prio && getPriorityBadge(task.prio)}
              </div>
              <div className="flex gap-2 items-center mt-1">
                <Avatar className="h-4 w-4"
                  src={task.creator?.avatar}
                  name={task.creator?.name ?? '?'}/>
                <span className="flex-shrink-0 text-xs text-gray-500 mr-2" aria-hidden="true">#{task.key}</span>
                {task.status && <div className="flex items-center">
                  {getStatusIcon(task.status)}
                  <span className="ml-1 text-xs text-gray-500">{task.status}</span>
                </div>}
              </div>
            </div>
          </li>

        </a>
      </div>
    ))}
  </ul>;
};