"use client";

import {FC} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CheckCircle2, Clock, GitBranch, GitCommit, GitPullRequest, XCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Workflow} from "@/app/api/github/workflow/types";


export const WorkflowList: FC<{ runs: Workflow[], title: string }> = ({runs, title}) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        <ul className="space-y-4">
          {runs.map((run) => (
            <li key={run.id}>
              <a href={run.html_url} target="_blank">
                <div className="flex  justify-between p-4 bg-muted rounded-lg flex-col lg:flex-row lg:items-center">
                  <div className="flex items-start space-x-4">
                    <div className='w-4'>
                      {run.conclusion === "success" && <CheckCircle2 className="text-green-500"/>}
                      {run.conclusion === "failure" && <XCircle className="text-red-500"/>}
                      {run.conclusion === "running" && <Clock className="text-yellow-500 animate-spin"/>}
                    </div>
                    <div>
                      <h3 className="font-semibold flex flex-col">
                        {run.name}
                      </h3>

                      <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
                        <GitBranch className="w-3 h-3"/>
                        <span>{run.head_branch}</span>
                      </Badge>


                      <p className="text-sm text-muted-foreground">
                        {run.display_title}
                      </p>

                      <div className='flex flex-col'>


                        <p className="text-sm text-muted-foreground">
                          {new Date(run.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col content-start space-x-2">
                    <Badge variant="outline" className="flex items-center space-x-1">
                      {run.event === "push" && <GitCommit className="w-3 h-3"/>}
                      {run.event === "pull_request" && <GitPullRequest className="w-3 h-3"/>}
                      {run.event === "release" && <GitBranch className="w-3 h-3"/>}
                      <span>{run.event}</span>
                    </Badge>

                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </CardContent>
  </Card>
    ;
}