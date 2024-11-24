'use client';

import { IssueList, IssuePrio, IssueStatus } from '@/components/issues/issue-list';
import { GeneralApiData } from '@/components/widgets/general-api-data';
import { Issue } from 'jira.js/out/version3/models';
import { FC } from 'react';
import { toast } from 'sonner';

export const JiraIssueSearch: FC<{title: string, jql: string}> = ({ title, jql }) => {
  return <GeneralApiData<Issue[]> endpoint={`/api/jira/search?query=${jql}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new Issues`);
    }}>
    {(issues) => (<IssueList issues={(issues ?? []).map((task) => ({
      url: task.self,
      summary: task.fields.summary,
      prio: task.fields.priority?.name as IssuePrio,
      status: task.fields.status?.name as IssueStatus,
      id: task.id,
      key: task.key,
      assignee: { name: task.fields.assignee?.name, avatar: task.fields.assignee?.avatarUrls?.['48x48'] },
      creator: { name: task.fields.creator?.name, avatar: task.fields.creator?.avatarUrls?.['48x48'] }
    }))} title={title}/>)}
  </GeneralApiData>;
};