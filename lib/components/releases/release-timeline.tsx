'use client';

import { Release } from '@/app/api/github/release/types';
import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { SiGithub } from '@icons-pack/react-simple-icons';
import Markdown from 'markdown-to-jsx';
import { FC } from 'react';
import { Avatar } from '../avatar';
import Timeline, { TimelineItem } from '../timeline';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

export const ReleaseTimeline: FC<{releases: Release[], title: string}> = ({ releases, title }) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        <Timeline>
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
        </Timeline>
      </ScrollArea>
    </CardContent>
    <CardFooter>
      <SiGithub/>
    </CardFooter>
  </Card>
    ;
};