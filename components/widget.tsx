'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { FC, PropsWithChildren } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export const Widget: FC<PropsWithChildren<{title: string}>> = ({ children, title }) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        {children}
      </ScrollArea>
    </CardContent>
  </Card>
    ;
};