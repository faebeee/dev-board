'use client';

import { GithubCommit } from '@/app/api/github/commits/types';
import { Avatar } from '@/lib/components/avatar';
import Timeline from '@/lib/components/timeline';
import { Widget } from '@/lib/components/widget';
import { GeneralApiData } from '@/lib/components/widgets/general-api-data';
import { BasicWidgetProps } from '@/lib/components/widgets/types';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { FC } from 'react';
import { toast } from 'sonner';

export const GhPackagesWidget: FC<{title: string} & BasicWidgetProps> = ({ title, dashboard, widget }) => {
  return <GeneralApiData<GithubCommit[]> endpoint={`/api/github/packages?dashboard=${dashboard}&widget=${widget}`}
    identifier={'key'}
    onNew={(newItems) => {
      toast(`${newItems?.length} new Issues`);
    }}>
    {(commits) => (<Widget footer={<SiGithub/>} title={title}>
      <Timeline>
        {commits?.map((commit) => (<a target={'_blank'} key={commit.node_id} href={commit.html_url}>
          <div key={commit.node_id} className="mb-8 flex gap-2 items-center w-full right-timeline">
            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-primary-foreground">
                <Avatar src={commit.author?.avatar_url} name={commit.author?.login ?? 'K/A'}/>
              </h1>
            </div>
            <div className="order-1 bg-card rounded-lg shadow-xl w-full px-6 py-4">
              <h3 className="mb-3 font-bold text-primary text-xl">
                {commit.author?.login}
                {commit.commit?.author?.date && <span
                  className="ml-2 text-xs text-muted-foreground">{new Date(commit.commit?.author?.date).toLocaleString()}</span>}
              </h3>
              <div
                className="text-sm leading-snug tracking-wide text-muted-foreground text-opacity-100 flex-col gap-2">
                {commit.commit.message.substring(0, 150)}
              </div>
            </div>
          </div>
        </a>))}
      </Timeline>
    </Widget>)}
  </GeneralApiData>;
};