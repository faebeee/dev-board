import {Suspense} from "react";

import {Header} from "@/components/header";
import {WidgetGrid} from "@/components/widget-grid";
import {Dashboard} from "@/types/widgets";
import {notFound} from "next/navigation";

export default async function Home({params}: { params: { dashboard: string } }) {
  const dashboards = ((await import('../../config.json')).default as Dashboard[]);
  const dashboard = dashboards.find(d => d.id === params.dashboard);
  if (!dashboard) {
    notFound();
    return null;
  }
  return (
    <>
      <Header links={dashboards.map((dashboard) => ({label: dashboard.title, href: `/${dashboard.id}`}))}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <h1 className={'text-2xl mb-4'}>{dashboard.title}</h1>
          <WidgetGrid widgets={dashboard.widgets}/>
        </div>
      </Suspense>
    </>
  );
}
