"use client";

import {FC, ReactNode} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CheckCircle2, Circle, Clock, Flag, MessageCircleQuestion} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Avatar} from "@/components/avatar";
import {Issue} from "jira.js/out/version3/models";

type Task = {
  id: number
  title: string
  status: 'Open' | 'In Progress' | 'Done'
}


export const JiraIssueList: FC<{ issues: Issue[], title: ReactNode }> = ({issues, title}) => {

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'Open':
        return <Circle className="h-5 w-5 text-gray-400" aria-hidden="true"/>
      case 'In Progress':
        return <Clock className="h-5 w-5 text-blue-500" aria-hidden="true"/>
      case 'Done':
        return <CheckCircle2 className="h-5 w-5 text-green-500" aria-hidden="true"/>
      default:
        return <MessageCircleQuestion className="h-5 w-5 text-gray-400" aria-hidden="true"/>
    }
  }

  const getPriorityBadge = (priority: Issue['fields']['priority']['name']) => {
    const colors: Record<string, string> = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800"
    }

    return (
      <Badge variant="outline" className={`${priority ? colors[priority] : 'bg-gray-200 text-gray-900'} ml-2`}>
        <Flag className="h-3 w-3 mr-1" aria-hidden="true"/>
        {priority}
      </Badge>
    )
  }

  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>Total {issues?.length} issues</CardDescription>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        <ul className="space-y-4" role="list">
          {issues.map((task) => (<div key={task.key}>
              <a target="_blank" href={`https://konova.atlassian.net/browse/${task.key}`}>
                <li className="flex items-center space-x-4 rounded-md border p-4">
                  <Avatar className="h-10 w-10" src={task.fields.assignee?.avatarUrls?.['48x48']}
                          name={task.fields.assignee?.displayName ?? '?'}/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {task.fields.summary}
                      </p>
                      {getPriorityBadge(task.fields.priority.name)}
                    </div>
                    <div className="flex gap-2 items-center mt-1">
                      <Avatar className="h-4 w-4" src={task.fields.creator?.avatarUrls?.['48x48']}
                              name={task.fields.creator?.displayName ?? '?'}/>
                      <span className="flex-shrink-0 text-xs text-gray-500 mr-2" aria-hidden="true">#{task.key}</span>
                      <div className="flex items-center">
                        {getStatusIcon(task.fields.status.name as Task['status'])}
                        <span className="ml-1 text-xs text-gray-500">{task.fields.status.name}</span>
                      </div>
                    </div>
                  </div>
                </li>

              </a>
            </div>
          ))}
        </ul>
      </ScrollArea>
    </CardContent>
  </Card>
    ;
}