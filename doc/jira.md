# Jira

## jira-search

### Preview
![jira-search-example.png](assets/jira-search-example.png)


### Config
```json
 {
    "id": "UNIQUE ID",
    "widget": "jira-search",
    "config": {
      "title": "Issues to deploy",
      "jql": "sprint in openSprints() and assignee = currentUser() and status IN (Backlog, \"In Progress\", \"In Review\", Open, Ready, Todo) ORDER BY status DESC"
    }
  }
```

`config.jql` can be any Jira query

--- 

## jira-release

### Preview
![jira-release.png](assets/jira-releases.png)


### Config
```json
{
  id: 'jira-releases',
  widget: 'jira-release-list',
  config: {
    title: 'Jira Releases',
    project: 'XXX',
    host: 'https://XXX.atlassian.net'
  }
},
```

`config.jql` can be any Jira query

--- 

## jira-sprint-gauge

### Preview
![jira-sprint-gauge.png](assets/jira-sprint-gauge.png)

### Config
```json
{
  "id": "sprint-progress",
  "widget": "jira-sprint-gauge",
  "config": {
    "title": "Unassigned Tasks in Sprint",
    "jql": "sprint in openSprints() ORDER BY status DESC",
    "host": "https://XXX.atlassian.net",
    "categories": [
      "Issue Status 1",
      "Issue Status 2"
    ]
  }
},
```

`config.jql` can be any Jira query