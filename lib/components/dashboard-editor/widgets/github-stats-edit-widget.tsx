"use client";

import { EditWidgetProps } from '@/lib/components/dashboard-editor/widgets/edit-widget';
import { GithubEditForm, GithubWidgetConfig } from '@/lib/components/dashboard-editor/widgets/github-edit-form';
import { Button } from '@/lib/components/ui/button';
import { Widget } from '@/lib/components/widget';
import { GithubBranchListWidget } from '@/lib/types/widget';
import { FC, useState } from 'react';

export const GithubStatsEditWidget: FC<EditWidgetProps<GithubBranchListWidget['config']>> = ({
  id,
  onChange,
  onRemove
}) => {
  const [data, setData] = useState<GithubWidgetConfig>({ title: '', owner: '', repo: '' });

  const onSave = () => {
    onChange(id, data);
  };

  return <Widget title={'Github Stats'}>
    <div className={'flex flex-col gap-4'}>
      <GithubEditForm onChange={setData}/>

      <div className={'flex flex-row gap-2'}>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={() => onRemove(id)} variant={'destructive'}>Remove</Button>
      </div>
    </div>
  </Widget>;
};