'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

export const Widget: FC<PropsWithChildren<{title: string, footer?: ReactNode}>> = ({ children, title, footer }) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        {children}
      </ScrollArea>
    </CardContent>
    <CardFooter>
      {footer}
    </CardFooter>
  </Card>
    ;
};