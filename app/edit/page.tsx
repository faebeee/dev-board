import { DashboardEditor } from '@/lib/components/dashboard-editor/dashboard-editor';
import { Header } from '@/lib/components/header';
import { getConfig } from '@/lib/get-config';
import { Suspense } from 'react';

export default async function EditPage() {
  const config = await getConfig();

  return (<>
      <Header title={'Edit'}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <DashboardEditor config={config}/>
        </div>
      </Suspense>
    </>
  );
}