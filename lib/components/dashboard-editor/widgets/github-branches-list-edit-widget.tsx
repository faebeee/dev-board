'use client';

import { Input } from '@/components/ui/input';
import { EditWidgetProps } from '@/lib/components/dashboard-editor/widgets/edit-widget';
import { Button } from '@/lib/components/ui/button';
import { Widget } from '@/lib/components/widget';
import { GithubBranchListWidget } from '@/lib/types/widget';
import { FC, useState } from 'react';

export const GithubBranchesListEditWidget: FC<EditWidgetProps<GithubBranchListWidget['config']>> = ({
  id,
  onChange,
  onRemove
}) => {
  const [owner, setOwner] = useState('');
  const [title, setTitle] = useState('');
  const [repo, setRepo] = useState('');

  const onSave = () => {
    onChange(id, {
      title,
      owner,
      repo,
    });
  };

  return <Widget title={'Github Branches'}>
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-2'}>
        <Input placeholder={'Title'} value={title} onChange={e => setTitle(e.target.value)}/>
        <Input placeholder={'Owner'} value={owner} onChange={e => setOwner(e.target.value)}/>
        <Input placeholder={'Repo'} value={repo} onChange={e => setRepo(e.target.value)}/>
      </div>

      <div className={'flex flex-row gap-2'}>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={() => onRemove(id)} variant={'destructive'}>Remove</Button>
      </div>
    </div>
  </Widget>;
};