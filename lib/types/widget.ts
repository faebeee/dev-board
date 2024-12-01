import { WidgetType } from '@/lib/config-schema';


export type Widget<T = object> = {
  id: string;
  widget: WidgetType,
  config: T
  layout?: {
    cols?: 1 | 2 | 3 | 4
  }
}

export type SentryErrorsWidget = Widget & {
  widget: 'sentry-errors'
  config: {
    title: string;
    org: string;
    project: string;
  }
}

export type SentryIssuesWidget = Widget & {
  widget: 'sentry-issues'
  config: {
    title: string;
    org: string;
    project: string;
  }
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

export type DashboardType = 'carousel' | 'grid'

export type Dashboard = {
  title: string;
  id: string;
  widgets: (Widget | VercelDeploymentWidget | SentryErrorsWidget | SentryIssuesWidget)[]
  type: DashboardType;
}