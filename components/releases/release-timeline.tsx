"use client";

import {FC} from "react";
import {Avatar} from "../avatar";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import Timeline, {TimelineItem} from "../timeline";
import Markdown from "markdown-to-jsx";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Release} from "@/app/api/github/release/types";

export const ReleaseTimeline: FC<{ releases: Release[], title: string }> = ({releases, title}) => {
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
  </Card>
    ;
}