'use client';

import { Button } from '@/components/ui/button';
import { setConfigAction } from '@/lib/actions/set-config-action';
import { configSchema } from '@/lib/config-schema';
import { FC, useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import JSONInput from 'react-json-editor-ajrm';


export const JsonEditor: FC<{config: object}> = ({ config }) => {
  const [value, setValue] = useState(config);
  const [error, setError] = useState<{reason: string} | null>(null);

  const onValidate = async () => {
    setError(null);
    try {
      console.log(value);
      await configSchema.validate(value);
    } catch (e) {
      setError({ reason: (e as Error).message });
    }
  };

  useEffect(() => {
    onValidate();
  }, [value]);


  return <><JSONInput
    width={'100%'}
    height={'80vh'}
    onChange={(data: {json: string, error?: {reason: string}}) => {
      if (data.error) {
        setError(data.error);
        return;
      }
      try {
        setValue(JSON.parse(data.json));
      } catch (e) {
        setError({ reason: (e as Error).message });
      }
    }}
    placeholder={config}
    error={error}
  />
    <Button onClick={() => setConfigAction(JSON.stringify(value))}>Save</Button>
    <Button variant={'destructive'} onClick={() => setConfigAction()}>Clear</Button>
  </>;
};