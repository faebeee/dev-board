"use client";

import {useGhContext} from "@/lib/context/gh-context";
import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {githubApiFetch} from "@/lib/fetch-api";
import {ScrollArea} from "@/components/ui/scroll-area";
import {CheckCircle2, Clock, GitBranch, GitCommit, GitPullRequest, XCircle} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Workflow} from "@/app/api/github/workflow/types";


export const WorkflowList = () => {
  const {owner, repo} = useGhContext();
  const [runs, setRuns] = useState<Workflow[]>([]);

  const load = async () => {
    const data = await githubApiFetch('/api/github/workflow', owner, repo)
    setRuns(data);
  }

  useEffect(() => {
    load();
  }, [load]);

  return <Card>
    <CardHeader>
      <CardTitle>Workflows</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        <ul className="space-y-4">
          {runs.map((run, index) => (
            <li key={index}>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  {run.conclusion === "success" && <CheckCircle2 className="text-green-500"/>}
                  {run.conclusion === "failure" && <XCircle className="text-red-500"/>}
                  {run.conclusion === "running" && <Clock className="text-yellow-500 animate-spin"/>}
                  <div>
                    <h3 className="font-semibold">{run.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(run.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="flex items-center space-x-1">
                    {run.event === "push" && <GitCommit className="w-3 h-3"/>}
                    {run.event === "pull_request" && <GitPullRequest className="w-3 h-3"/>}
                    {run.event === "release" && <GitBranch className="w-3 h-3"/>}
                    <span>{run.event}</span>
                  </Badge>
                  <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
                    <GitBranch className="w-3 h-3"/>
                    <span>{run.head_branch}</span>
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </CardContent>
  </Card>
    ;
}