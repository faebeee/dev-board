import { Header } from '@/components/header';
import { WidgetGrid } from '@/components/widget-grid';
import { getConfig } from '@/lib/get-config';
import { Suspense } from 'react';

export default async function Home() {
  const dashboards = await getConfig();

  return (
    <>
      <Header links={dashboards!.map((dashboard) => ({ label: dashboard.title, href: `/${dashboard.id}` }))}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {dashboards?.[0]?.widgets && <WidgetGrid dashboard={dashboards[0].id} widgets={dashboards[0].widgets!}/>}
        </div>
      </Suspense>
    </>
  );
}
