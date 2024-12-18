import { Badge } from '@/lib/components/ui/badge';
import { FC } from 'react';

export type Tag = {
  name: string;
  commit: {
    sha: string;
  };
}

export const TagList: FC<{tags: Tag[]}> = ({ tags }) => {
  return <ul className="space-y-2">
    {tags.map((tag) => (
      <li key={tag.commit.sha} className="flex items-center justify-between">
        <Badge variant="secondary">{tag.name}</Badge>
        <a
          href={`https://github.com/vercel/next.js/tree/${tag.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-500 hover:underline"
        >
          View
        </a>
      </li>
    ))}
  </ul>;
};