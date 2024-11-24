import {getConfig} from "@/lib/get-config";
import {configSchema} from '@/lib/config-schema';
import {JsonEditor} from "@/components/json-editor";
import {Header} from "@/components/header";
import {Suspense} from "react";

export default async function EditPage() {
  const config = await getConfig();

  return (<>
      <Header links={config!.map((dashboard) => ({label: dashboard.title, href: `/${dashboard.id}`}))}/>
      <Suspense>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <JsonEditor config={config}/>
        </div>
      </Suspense>
    </>
  );
}