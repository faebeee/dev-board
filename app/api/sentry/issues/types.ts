export interface SentryIssue {
  id: string;
  shareId: string;
  shortId: string;
  title: string;
  culprit: string;
  permalink: string;
  logger: string;
  level: string;
  status: string;
  statusDetails: unknown;
  substatus: string;
  isPublic: boolean;
  platform: string;
  project: Project;
  type: string;
  metadata: Metadata;
  numComments: number;
  assignedTo: unknown;
  isBookmarked: boolean;
  isSubscribed: boolean;
  subscriptionDetails: SubscriptionDetails;
  hasSeen: boolean;
  annotations: unknown[];
  issueType: string;
  issueCategory: string;
  priority: string;
  priorityLockedAt: unknown;
  isUnhandled: boolean;
  count: string;
  userCount: number;
  firstSeen: string;
  lastSeen: string;
  stats: Stats;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  platform: string;
}

export interface Metadata {
  value: string;
  type: string;
  filename?: string;
  function?: string;
  in_app_frame_mix: string;
  sdk: Sdk;
  initial_priority: number;
  title: string;
}

export interface Sdk {
  name: string;
  name_normalized: string;
}

export interface SubscriptionDetails {
  disabled: boolean;
}

export interface Stats {
  '24h': number[][];
}
