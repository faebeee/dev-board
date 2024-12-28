'use client';

import { Release } from '@/app/api/github/release/types';
import Markdown from 'markdown-to-jsx';
import { FC } from 'react';
import { Avatar } from '../avatar';
import Timeline, { TimelineItem } from '../timeline';

export const ReleaseTimeline: FC<{releases: Release[], title: string}> = ({ releases }) => {
  return <Timeline>
    {
      releases.map((release) => (
        <TimelineItem key={release.id}
          date={release.published_at!}
          title={release.name!}
          description={<>
            <Markdown>{release.body!}</Markdown>
            <Avatar name={release.author.login} src={release.author.avatar_url}/>
          </>}/>))
    }
  </Timeline>;
};