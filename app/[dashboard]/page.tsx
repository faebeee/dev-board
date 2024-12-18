import { Dashboard } from '@/lib/components/dashboard';
import { Header } from '@/lib/components/header';
import { getConfig } from '@/lib/get-config';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function Home({ params }: {params: Promise<{dashboard: string}>}) {
  const dashboards = await getConfig();
  const dashboardToFind = (await params).dashboard;
  if (!dashboards) {
    return notFound();
  }
  const dashboard = dashboards.find(d => d.id === dashboardToFind);
  if (!dashboard) {
    notFound();
    return null;
  }
  return (
    <>
      <Header title={dashboard.title}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Dashboard dashboardId={dashboard.id} type={dashboard.type} widgets={dashboard.widgets ?? []}/>
        </div>
      </Suspense>
    </>
  );
}
