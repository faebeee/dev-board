import {object, string, number, array, InferType} from 'yup';


export const widgetTypes = [
  'jira-search',
  'all-pull-requests',
  'jira-release-list',
  'repo-events',
  'release-history',
  'my-pull-requests',
  'pull-requests-to-review',
  'workflow-run'
]

const widgetSchema = object({
  id: string().required(),
  widget: string().oneOf(widgetTypes),
  config: object()
    .when('widget', {
      is: (widget) => widget === 'jira-search',
      then: schema => schema.shape({
        title: string().required(),
        jql: string().required()
      }),
      otherwise: (schema) => schema.shape({})
    })

    .required()
})

const dashboardSchema = object({
  id: string().required(),
  title: string().required(),
  widgets: array(widgetSchema)
})


export const configSchema = array().of(dashboardSchema);

export type ConfigType = InferType<typeof configSchema>;
export type DashboardType = InferType<typeof dashboardSchema>;
export type WidgetType = InferType<typeof widgetSchema>;

