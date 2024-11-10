"use client";

import {FC, ReactNode} from "react";
import {Avatar} from "../avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge"
import {ScrollArea} from "@/components/ui/scroll-area"
import {GitPullRequest} from "lucide-react";
import {PullRequest} from "@/app/api/github/pr/types";

export const PrList: FC<{
  pullRequest: PullRequest[],
  title: ReactNode
}> = ({title, pullRequest}) => {
  return <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[450px]">
        {pullRequest.map((pr) => (
          <div key={pr.number} className="flex items-start space-x-4 mb-4">
            <Avatar src={pr.user?.avatar_url} name={pr.user?.login}/>
            <div className="space-y-1">
              <h3 className="font-medium">{pr.title}</h3>
              <p className="text-sm text-gray-500">
                #{pr.number} opened by {pr.user?.login} on {new Date(pr.created_at).toLocaleDateString()}
              </p>
              <div className="flex items-center space-x-2">
                <GitPullRequest className="w-4 h-4"/>
                <Badge variant={pr.state === 'open' ? 'default' : 'secondary'}>
                  {pr.state}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

    </CardContent>
  </Card>;
}