import { Avatar } from '@/components/avatar';
import { Badge } from '@/components/ui/badge';
import { GitBranch, GitCommit } from 'lucide-react';
import { FC } from 'react';
import { Card, CardContent } from '../ui/card';

export type Branch = {
  name: string;
  url?: string;
  lastCommit: {
    message: string,
    author: {
      name?: string,
      avatar?: string,
    },
    date?: string,
  },
}

export const BranchList: FC<{branches: Branch[]}> = ({ branches }) => {
  return <ul className="space-y-4">
    {branches.map((branch, index) => (
      <li key={index}>
        <a href={branch.url} target={'_blank'}>
          <Card>
            <CardContent className="flex items-start space-x-4 p-4">
              <GitBranch className="mt-1 h-5 w-5 flex-shrink-0 text-gray-500"/>
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{branch.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {branch.lastCommit.date && new Date(branch.lastCommit.date).toLocaleString()}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  <GitCommit className="mr-1 inline-block h-4 w-4"/>
                  {branch.lastCommit.message}
                </p>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6" src={branch.lastCommit.author.avatar}
                    name={branch.lastCommit.author.name}/>
                  <span className="text-sm text-gray-600">{branch.lastCommit.author.name}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </a>
      </li>
    ))}
  </ul>;
};