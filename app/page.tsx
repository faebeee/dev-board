import { Dashboard } from '@/components/dashboard';
import { Header } from '@/components/header';
import { getConfig } from '@/lib/get-config';
import { Suspense } from 'react';

export default async function Home() {
  const dashboards = await getConfig();

  return (
    <>
      <Header title={'Home'}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {dashboards?.[0]?.widgets && <Dashboard type={dashboards[0].type} dashboardId={dashboards[0].id} widgets={dashboards[0].widgets!}/>}
        </div>
      </Suspense>
    </>
  );
}
