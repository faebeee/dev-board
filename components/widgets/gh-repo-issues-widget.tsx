'use client';

import { RepoIssue } from '@/app/api/github/issues/types';
import { GH_API_OWNER_HEADER, GH_API_REPO_HEADER } from '@/app/api/github/types';
import { IssueList, IssueStatus } from '@/components/issues/issue-list';
import { GeneralApiData } from '@/components/widgets/general-api-data';
import { GHBasicProps } from '@/components/widgets/types';
import { FC } from 'react';
import { toast } from 'sonner';

export const GhRepoIssuesWidget: FC<{title: string} & GHBasicProps> = ({ title, owner, repo }) => {
  return <GeneralApiData<RepoIssue[]> endpoint={'/api/github/issues'}
    fetchInit={{
      headers: {
        [GH_API_OWNER_HEADER]: owner,
        [GH_API_REPO_HEADER]: repo,
      }
    }}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new Issues`);
    }}>
    {(issues) => (<IssueList issues={(issues ?? [])?.map((task) => ({
      id: task.id,
      key: task.number,
      assignee: {
        avatar: task.assignee?.avatar_url,
        name: task.assignee?.name ?? undefined
      },
      creator: {
        name: task.user?.name ?? undefined,
        avatar: task.user?.avatar_url
      },
      status: task.state as IssueStatus,
      summary: task.title,
      url: task.html_url


    }))} title={title}/>)}
  </GeneralApiData>;
};