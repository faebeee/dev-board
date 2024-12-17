import { array, number, object, string } from 'yup';


export const widgetTypes = [
  'jira-search',
  'all-pull-requests',
  'jira-release-list',
  'github-repo-events',
  'release-history',
  'my-pull-requests',
  'pull-requests-to-review',
  'workflow-run',
  'github-issues',
  'vercel-deployments',
  'github-commits',
  'github-commits-charts',
  'sentry-errors',
  'sentry-issues',
  'github-branches',
  'github-packages',
  'jira-sprint-gauge',
  'jira-issues-gauge',
];
export type WidgetType = typeof widgetTypes[number];

const widgetSchema = object({
  id: string().required(),
  widget: string().oneOf(widgetTypes).required(),
  layout: object().shape({
    cols: number(),
  }),
  config: object()
  .when('widget', {
    is: (widget: string) => widget === 'jira-search',
    then: schema => schema.shape({
      title: string().required(),
      jql: string().required(),
      host: string().required(),
    }),
    otherwise: (schema) => schema.shape({})
  })
  .when('widget', {
    is: (widget: WidgetType) => widget === 'jira-sprint-gauge',
    then: schema => schema.shape({
      title: string().required(),
      jql: string().required(),
      host: string().required(),
      categories: array().of(string()).required(),
    }),
    otherwise: (schema) => schema.shape({})
  })
  .when('widget', {
    is: (widget: WidgetType) => widget === 'jira-issues-gauge',
    then: schema => schema.shape({
      title: string().required(),
      jql: string().required(),
      host: string().required(),
    }),
    otherwise: (schema) => schema.shape({})
  })
  .when('widget', {
    is: (widget: string) => ['github-issues'].includes(widget),
    then: schema => schema.shape({
      title: string().required(),
      owner: string().required(),
      repo: string().required(),
    }),
    otherwise: (schema) => schema.shape({})
  })
  .when('widget', {
    is: (widget: string) => ['sentry-errors', 'sentry-issues'].includes(widget),
    then: schema => schema.shape({
      title: string().required(),
      org: string().required(),
      project: string().required(),
    }),
    otherwise: (schema) => schema.shape({})
  })

  .required()
});

const dashboardSchema = object({
  id: string().required(),
  title: string().required(),
  widgets: array(widgetSchema),
  type: string().oneOf(['grid', 'carousel']).required(),
});


export const configSchema = array().of(dashboardSchema);
