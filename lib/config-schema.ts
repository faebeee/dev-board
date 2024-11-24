import { array, InferType, object, string } from 'yup';


export const widgetTypes = [
  'jira-search',
  'all-pull-requests',
  'jira-release-list',
  'repo-events',
  'release-history',
  'my-pull-requests',
  'pull-requests-to-review',
  'workflow-run',
  'github-issues'
];
export type WidgetType = typeof widgetTypes[number];

const widgetSchema = object({
  id: string().required(),
  widget: string().oneOf(widgetTypes),
  config: object()
  .when('widget', {
    is: (widget: string) => widget === 'jira-search',
    then: schema => schema.shape({
      title: string().required(),
      jql: string().required()
    }),
    otherwise: (schema) => schema.shape({})
  }).when('widget', {
    is: (widget: string) => ['github-issues'].includes(widget),
    then: schema => schema.shape({
      title: string().required(),
      owner: string().required(),
      repo: string().required(),
    }),
    otherwise: (schema) => schema.shape({})
  })

  .required()
});

const dashboardSchema = object({
  id: string().required(),
  title: string().required(),
  widgets: array(widgetSchema)
});


export const configSchema = array().of(dashboardSchema);

export type ConfigType = InferType<typeof configSchema>;
export type DashboardType = InferType<typeof dashboardSchema>;

