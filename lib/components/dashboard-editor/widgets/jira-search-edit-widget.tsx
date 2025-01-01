import { Input } from '@/components/ui/input';
import { EditWidgetProps } from '@/lib/components/dashboard-editor/widgets/edit-widget';
import { Button } from '@/lib/components/ui/button';
import { Widget } from '@/lib/components/widget';
import { JiraSearchWidget } from '@/lib/types/widget';
import { FC, useState } from 'react';

export const JiraSearchEditWidget: FC<EditWidgetProps<JiraSearchWidget['config']>> = ({
  id,
  onChange,
  onRemove
}) => {
  const [jql, setJql] = useState('');
  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');

  const onSave = () => {
    onChange(id, {
      jql,
      title,
      host
    });
  };

  return <Widget title={'Jira Search'}>
    <div className={'flex flex-col gap-4'}>
      <div className={'flex flex-col gap-2'}>
        <Input placeholder={'Title'} value={title} onChange={e => setTitle(e.target.value)}/>
        <Input placeholder={'JQL'} value={jql} onChange={e => setJql(e.target.value)}/>
        <Input placeholder={'XXX.atlassian.net'} value={host} onChange={e => setHost(e.target.value)}/>
      </div>
      <div className={'flex flex-row gap-2'}>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={() => onRemove(id)} variant={'destructive'}>Remove</Button>
      </div>
    </div>
  </Widget>;
};