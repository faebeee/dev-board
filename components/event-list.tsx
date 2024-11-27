'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FC, ReactNode } from 'react';


export type EventItem = {
  id: string | number;
  url?: string;
  prefix?: ReactNode
  icon?: ReactNode
  title: string
  created_at?: string
}

export const EventList: FC<{events: EventItem[], title: string}> = ({ events, title }) => {

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Showing the latest GitHub repository events</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px]">
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id}>
                <a href={event.url} target={'_blank'}
                  className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
                  {event.prefix}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col">
                      <span className="font-bold">{event.title}</span>
                      {event.created_at && <span
                        className="text-muted-foreground text-xs">{new Date(event.created_at).toLocaleString()}</span>}
                    </div>
                    <div className="flex text-sm">
                      {event.icon}
                      <span className="ml-2">
                          </span>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};