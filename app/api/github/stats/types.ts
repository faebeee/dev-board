export type GithubRepoStatsResponseEntry = {date: Date, add: number, remove: number};
export type GithubRepoStatsResponse = Record<number, GithubRepoStatsResponseEntry>;
