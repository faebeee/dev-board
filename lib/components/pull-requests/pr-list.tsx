'use client';

import { PullRequest, PullRequestReview } from '@/app/api/github/pr/types';
import { GH_API_OWNER_HEADER, GH_API_REPO_HEADER } from '@/app/api/github/types';
import { Badge } from '@/lib/components/ui/badge';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { CheckCircle, GitPullRequestArrow } from 'lucide-react';
import { FC } from 'react';
import { Avatar } from '../avatar';

export const PrList: FC<{
  pullRequest: PullRequest[],
}> = ({ pullRequest }) => {
  return <div>
    {pullRequest.map((pr) => (<a href={pr.html_url} target="_blank" key={pr.number}>
        <div className="flex items-start space-x-4 mb-4">
          <Avatar src={pr.assignee?.avatar_url} name={pr.assignee?.login}/>
          <div className="space-y-1">
            <h3 className="font-medium">{pr.title}</h3>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              #{pr.number} opened by <Avatar className={'w-6 h-6'} src={pr.user?.avatar_url}
              name={pr.user?.login}/> {pr.user?.login} on {new Date(pr.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-2">
              {pr.requested_reviewers?.map((reviewer) => <Avatar className={'w-4 h-4'} key={reviewer.id}
                src={reviewer?.avatar_url}
                name={reviewer?.login}/>)}

              <GeneralApiData<PullRequestReview[]> endpoint={`/api/github/pr/${pr.number}/review`}
                fetchInit={{
                  headers: {
                    [GH_API_OWNER_HEADER]: 'konova-ag',
                    [GH_API_REPO_HEADER]: 'emi-app',
                  }
                }}>
                {(reviews) => <>{reviews?.[0]?.state === 'APPROVED' &&
                  <CheckCircle className={'text-green-500 w-4 h-4'}/>}</>}
              </GeneralApiData>

              <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
                <GitPullRequestArrow className="w-3 h-3"/>
                <span>{pr.base.ref}</span>
              </Badge>

              {pr.draft && <Badge variant={pr.state === 'open' ? 'default' : 'secondary'}>Draft</Badge>}

            </div>
          </div>
        </div>
      </a>
    ))}
  </div>;
};