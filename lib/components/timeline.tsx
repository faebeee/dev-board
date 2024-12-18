import {CheckCircle2} from "lucide-react"
import {PropsWithChildren, ReactNode} from "react";

interface TimelineItem {
  title: string
  description: ReactNode
  date: string
  icon?: React.ReactNode
}

export function TimelineItem({title, description, date, icon}: TimelineItem) {
  return (
    <div className="mb-8 flex gap-2 items-center w-full right-timeline">
      <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-primary-foreground">{icon || <CheckCircle2 size={16}/>}</h1>
      </div>
      <div className="order-1 bg-card rounded-lg shadow-xl w-full px-6 py-4">
        <h3 className="mb-3 font-bold text-primary text-xl">{title}
          <span className="ml-2 text-xs text-muted-foreground">{date}</span>
        </h3>
        <div
          className="text-sm leading-snug tracking-wide text-muted-foreground text-opacity-100 flex-col gap-2">{description}</div>
      </div>
    </div>
  )
}

export default function Timeline({children}: PropsWithChildren) {
  return (
    <div className="container mx-auto w-full h-full">
      <div className="relative wrap overflow-hidden h-full">
        <div className="border-2-2 absolute border-opacity-20 border-primary h-full border left-4"></div>
        {children}
      </div>
    </div>
  )
}
