'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export const Widget: FC<PropsWithChildren<{title: string, footer?: ReactNode, description?: ReactNode}>> = ({
  children,
  title,
  footer,
  description
}) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
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