'use client';

import { ScrollArea } from '@/lib/components/ui/scroll-area';
import { Skeleton } from '@/lib/components/ui/skeleton';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

export const Widget: FC<PropsWithChildren<{
  title: string,
  loading?: boolean;
  footer?: ReactNode,
  description?: ReactNode
}>> = ({
  children,
  title,
  footer,
  description,
  loading,
}) => {
  return <Card className={'flex flex-col h-full'}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent className={'relative flex-1'}>
      {loading && <>
        <Skeleton className="h-8 w-[120px]"/>
        <Skeleton className="mt-4 h-2 w-full"/>
        <Skeleton className="mt-2 h-2 w-[60%]"/>
      </>
      }
      <ScrollArea className="h-[450px]">
        {children}
      </ScrollArea>
    </CardContent>
    <CardFooter>
      {footer}
    </CardFooter>
  </Card>;
};