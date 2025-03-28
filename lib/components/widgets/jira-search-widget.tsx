'use client';

import { IssueList, IssuePrio, IssueStatus } from '@/lib/components/issues/issue-list';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { SiJira } from '@icons-pack/react-simple-icons';
import { Issue } from 'jira.js/out/version3/models';
import { FC } from 'react';
import { toast } from 'sonner';

export const JiraIssueSearch: FC<{title: string, jql: string, host: string}> = ({ title, jql, host }) => {
  return <GeneralApiData<Issue[]> endpoint={`/api/jira/search?query=${jql}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new Issues`);
    }}>
    {(issues, isLoading) => (<Widget title={title} description={jql} loading={isLoading} footer={<SiJira/>} counter={issues?.length}>
      <IssueList issues={(issues ?? []).map((task) => ({
        url: `${host}/browse/${task.key}`,
        summary: task.fields.summary,
        prio: task.fields.priority?.name as IssuePrio,
        status: task.fields.status?.name as IssueStatus,
        id: task.id,
        key: task.key,
        assignee: { name: task.fields.assignee?.name, avatar: task.fields.assignee?.avatarUrls?.['48x48'] },
        creator: { name: task.fields.creator?.name, avatar: task.fields.creator?.avatarUrls?.['48x48'] }
      }))} title={title}/>
    </Widget>)}
  </GeneralApiData>;
};

export default JiraIssueSearch