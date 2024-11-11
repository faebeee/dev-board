import {Suspense} from "react";

import {Header} from "@/components/header";
import {WidgetGrid} from "@/components/widget-grid";
import {Dashboard} from "@/types/widgets";

export default async function Home() {
  const dashboards = ((await import('../config.json')).default as Dashboard[]);

  return (
    <>
      <Header links={dashboards.map((dashboard) => ({label: dashboard.title, href: `/${dashboard.id}`}))}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <WidgetGrid widgets={dashboards[0]!.widgets}/>
        </div>
      </Suspense>
    </>
  );
}
