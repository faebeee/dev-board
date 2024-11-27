export interface SentryError {
  id: string
  "event.type": string
  groupID: string
  eventID: string
  projectID: string
  message: string
  title: string
  location: string
  culprit: string
  user: unknown
  tags: Tag[]
  platform: string
  dateCreated: string
  crashFile: string | null
  metadata: Metadata
}

export interface Tag {
  key: string
  value: string
}

export interface Metadata {
  filename: string
  function: string
  in_app_frame_mix: string
  type: string
  value: string
}
