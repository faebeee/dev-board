import { WidgetType } from '@/lib/config-schema';


export type Widget<T = object> = {
  id: string;
  widget: WidgetType,
  config: T
}

export type VercelDeploymentWidget = Widget & {
  widget: 'vercel-deployment'
  config: {
    title: string;
    app: string;
    projectId: string;
  }
}

export type GithubCommitListWidget = Widget & {
  widget: 'github-commits'
  config: {
    title: string;
    owner: string;
    repo: string;
  }
}

export type Dashboard = {
  title: string;
  id: string;
  widgets: (Widget | VercelDeploymentWidget)[]
}