import { WidgetType } from '@/lib/config-schema';

export type Widget<T> = {
  id: string;
  widget: WidgetType,
  config: T
}

export type VercelDeploymentWidgetConfig = {
  title: string;
  app: string;
  projectId: string;
};
export type VercelDeploymentWidget = Widget<VercelDeploymentWidgetConfig> & {
  widget: 'vercel-deployment'
}
