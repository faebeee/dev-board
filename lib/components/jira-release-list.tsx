'use client';

import { JiraRelease } from '@/app/api/jira/release/types';
import { Badge } from '@/lib/components/ui/badge';
import { Button } from '@/lib/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { FC } from 'react';

export const JiraReleaseList: FC<{release: JiraRelease[], project: string}> = ({
  release,
  project
}) => {
  return <div>
    {release.map((release) => {
      const url = new URL(release.self!);

      return (
        <Button
          key={release.id}
          variant="ghost"
          className="w-full justify-between bg-muted mb-2 h-auto py-2"
          asChild
        >
          <a
            href={`${url.protocol}${url.host}/projects/${project}/versions/${release.id}/tab/release-report-all-issues`}
            target="_blank" rel="noopener noreferrer">
            <div className="flex flex-col items-start">
              <span className="font-medium">{release.name}</span>
              <span className="text-sm text-muted-foreground">
                    {new Date(release.releaseDate!).toLocaleDateString()}
                  </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={release.released ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                variant={'secondary'}>
                {release.released ? 'Released' : 'Unreleased'}
              </Badge>
              <ExternalLink className="h-4 w-4"/>
            </div>
          </a>
        </Button>
      );
    })}
  </div>;
};