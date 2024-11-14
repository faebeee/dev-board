import { Header } from '@/components/header';
import { WidgetGrid } from '@/components/widget-grid';
import { getConfig } from '@/lib/get-config';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Home({ params }: {params: Promise<{dashboard: string}>}) {
  const dashboards = await getConfig();
  const dashboardToFind = (await params).dashboard;
  const dashboard = dashboards.find(d => d.id === dashboardToFind);
  if (!dashboard) {
    notFound();
    return null;
  }
  return (
    <>
      <Header links={dashboards.map((dashboard) => ({ label: dashboard.title, href: `/${dashboard.id}` }))}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <h1 className={'text-2xl mb-4'}>{dashboard.title}</h1>
          <WidgetGrid widgets={dashboard.widgets}/>
        </div>
      </Suspense>
    </>
  );
}
