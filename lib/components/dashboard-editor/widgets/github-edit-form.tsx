import { Input } from '@/components/ui/input';
import { FC, useEffect, useState } from 'react';

export type GithubWidgetConfig = {
  title: string;
  owner: string;
  repo: string;
}

export const GithubEditForm: FC<{
  data?: GithubWidgetConfig,
  onChange?: (data: {title: string, owner: string, repo: string}) => void
}> = ({ data, onChange }) => {
  const [owner, setOwner] = useState(data?.owner ?? '');
  const [title, setTitle] = useState(data?.title ?? '');
  const [repo, setRepo] = useState(data?.repo ?? '');

  useEffect(() => {
    onChange?.(
      {
        title,
        owner,
        repo,
      });
  }, [title, owner, repo]);


  return <>
    <div className={'flex flex-col gap-2'}>
      <Input placeholder={'Title'} value={title} onChange={e => setTitle(e.target.value)}/>
      <Input placeholder={'Owner'} value={owner} onChange={e => setOwner(e.target.value)}/>
      <Input placeholder={'Repo'} value={repo} onChange={e => setRepo(e.target.value)}/>
    </div>
  </>;
};