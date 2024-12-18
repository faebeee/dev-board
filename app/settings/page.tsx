import { Header } from '@/lib/components/header';
import { JsonEditor } from '@/lib/components/json-editor';
import { getConfig } from '@/lib/get-config';
import { Suspense } from 'react';

export default async function EditPage() {
  const config = await getConfig();

  return (<>
      <Header title={'Settings'}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {config && <JsonEditor config={config}/>}
        </div>
      </Suspense>
    </>
  );
}