import {FC} from "react"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {ArrowRight} from "lucide-react"
import Markdown from "markdown-to-jsx"

export const ReleaseCard: FC<{ version: string, changelog: string, url: string }> = ({version, url, changelog}) => {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Latest Release</CardTitle>
          <Badge variant="secondary" className="text-sm font-medium">
            {version}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={'flex-1'}>
        <Markdown>{changelog}</Markdown>
      </CardContent>
      <CardFooter>
        <a href={url} target="_blank" className="w-full">
          <Button className="w-full">
            View all changes
            <ArrowRight className="ml-2 h-4 w-4"/>
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}