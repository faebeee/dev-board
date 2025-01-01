'use client';

import { Input } from '@/components/ui/input';
import { EditWidgetProps } from '@/lib/components/dashboard-editor/widgets/edit-widget';
import { Button } from '@/lib/components/ui/button';
import { Widget } from '@/lib/components/widget';
import { JiraReleaseWidget } from '@/lib/types/widget';
import { FC, useState } from 'react';

export const JiraReleaseListEditWidget: FC<EditWidgetProps<JiraReleaseWidget['config']>> = ({
  id,
  onChange,
  onRemove
}) => {
  const [project, setProject] = useState('');
  const [title, setTitle] = useState('');

  const onSave = () => {
    onChange(id, {
      title,
      project,
    });
  };

  return <Widget title={'Jira Release List'}>
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-2'}>
        <Input placeholder={'Title'} value={title} onChange={e => setTitle(e.target.value)}/>
        <Input placeholder={'Project'} value={project} onChange={e => setProject(e.target.value)}/>
      </div>
      <div className={'flex flex-row gap-2'}>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={() => onRemove(id)} variant={'destructive'}>Remove</Button>
      </div>
    </div>
  </Widget>;
};