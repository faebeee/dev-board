"use client";

import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import {FC, useState, useEffect} from "react";
import {configSchema} from '@/lib/config-schema';
import {setConfigAction} from '@/lib/actions/set-config-action';
import {Button} from '@/components/ui/button';


export const JsonEditor: FC<{ config: object }> = ({config}) => {
  const [value, setValue] = useState(config);
  const [error, setError] = useState(null);

  const onValidate = async () => {
    setError(null)
    try {
      console.log(value);
      await configSchema.validate(value);
    } catch (e) {
      console.log(e.message);
      setError({reason: e.message})
    }
  }

  useEffect(() => {
    onValidate()
  }, [value]);


  return <><JSONInput
    width={'100%'}
    height={'80vh'}
    onChange={(data) => {
      if (data.error) {
        setError(data.error)
        return;
      }
      try {
        setValue(JSON.parse(data.json))
      } catch (e) {
        setError({reason: e.message})
      }
    }}
    placeholder={config}
    error={error}
  />
  <Button onClick={() => setConfigAction(JSON.stringify(value))}>Save</Button>
  </>;
}