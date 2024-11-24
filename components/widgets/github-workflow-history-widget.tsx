'use client';

import { GH_API_OWNER_HEADER, GH_API_REPO_HEADER } from '@/app/api/github/types';
import { Workflow } from '@/app/api/github/workflow/types';
import { Avatar } from '@/components/avatar';
import { Badge } from '@/components/ui/badge';
import { GeneralApiData } from '@/components/widgets/general-api-data';
import { WorkflowList } from '@/components/workflows/workflow-list';
import { GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { FC } from 'react';
import { toast } from 'sonner';
import { GHBasicProps } from './types';


export const GithubWorkflowHistoryWidget: FC<GHBasicProps & {title: string}> = ({ owner, repo, title }) => {

  return <GeneralApiData<Workflow[]> endpoint={'/api/github/workflow'}
    identifier={'id'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new runs`);
    }}
    fetchInit={{
      headers: {
        [GH_API_OWNER_HEADER]: owner,
        [GH_API_REPO_HEADER]: repo,
      }
    }}
  >
    {(runs) => (<WorkflowList title={title}
      runs={(runs ?? []).map((run) => ({
        id: run.id,
        url: run.html_url,
        status: run.status,
        title: run.name,
        subtitle: run.display_title,
        created_at: run.created_at,
        event: <>
          {run.triggering_actor &&
            <Avatar className={'w-4 h-4'} name={run.actor?.name} src={run.actor?.avatar_url}/>}

          <Badge variant="outline" className="flex items-center space-x-1">
            {run.event === 'push' && <GitCommit className="w-3 h-3"/>}
            {run.event === 'pull_request' && <GitPullRequest className="w-3 h-3"/>}
            {run.event === 'release' && <GitBranch className="w-3 h-3"/>}
            <span>{run.event}</span>
          </Badge>
        </>
      }))}/>)}
  </GeneralApiData>;
};