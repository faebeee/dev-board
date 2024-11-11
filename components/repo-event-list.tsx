"use client";

import {FC, useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {
  GitCommitHorizontal,
  GitPullRequest,
  Star,
  GitFork,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  GitBranch
} from 'lucide-react'
import {RepoEvent} from '@/app/api/github/event/types'
import {ScrollArea} from "@/components/ui/scroll-area";
import {Badge} from './ui/badge';


export const RepoEventList: FC<{ events: RepoEvent[], title: string }> = ({events, title}) => {
  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'PushEvent':
        return <GitCommitHorizontal className="h-4 w-4"/>
      case 'WatchEvent':
        return <Star className="h-4 w-4"/>
      case 'ForkEvent':
        return <GitFork className="h-4 w-4"/>
      case 'IssueCommentEvent':
        return <MessageSquare className="h-4 w-4"/>
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Showing the latest GitHub repository events</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[450px]">
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id}>
                <a href={event.payload.pull_request?.html_url} target={'_blank'}
                   className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={event.actor.avatar_url} alt={event.actor.login}/>
                    <AvatarFallback>{event.actor.login.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{event.actor.login}</span>
                      <span
                        className="text-muted-foreground text-sm">{new Date(event.created_at).toLocaleString()}</span>
                    </div>
                    <p className="flex text-sm">
                      {getEventIcon(event.type)}
                      <span className="ml-2">

                    {event.type === 'PushEvent' && <>
                      Pushed to
                      <Badge className="space-x-1 ml-1">
                        <GitPullRequest className="w-3 h-3"/>
                        <span>{event.payload.ref}</span>
                      </Badge>
                    </>}

                        {event.type === 'DeleteEvent' && <>Removed <Badge className="space-x-1 mx-1">
                          <GitBranch className="w-3 h-3"/>
                          <span>{event.payload.ref}</span>
                        </Badge></>}


                        {event.type === 'PullRequestReviewEvent' &&
                          <a href={event.payload.review.html_url} target={'_blank'}>Reviewed PR

                            <Badge className="space-x-1 mx-1">
                              <GitBranch className="w-3 h-3"/>
                              <span>{event.payload.pull_request.title}</span>
                            </Badge>


                            {event.payload.review.state === 'approved' &&
                              <CheckCircle className="h-4 w-4 text-green-500"/>}

                            {event.payload.review.state === 'pending' &&
                              <CheckCircle className="h-4 w-4 text-yellow-500"/>}

                            {event.payload.review.state === 'declined' &&
                              <CheckCircle className="h-4 w-4 text-red-500"/>}
                          </a>}

                        {event.type === 'PullRequestEvent' &&
                          <a href={event.payload.pull_request.html_url} target={'_blank'}>
                            {event.payload.action} <Badge className="space-x-1 mx-1">
                            <GitBranch className="w-3 h-3"/>
                            <span>{event.payload.pull_request.title}</span>
                          </Badge>
                            into <Badge className="space-x-1 mx-1">
                            <GitPullRequest className="w-3 h-3"/>
                            <span>{event.payload.pull_request.base.ref}</span>
                          </Badge>
                          </a>}
                  </span>
                    </p>

                    <p className="text-sm text-muted-foreground">{event.repo.name}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}