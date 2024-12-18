import { GithubCommit } from '@/app/api/github/commits/types';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/lib/components/ui/chart';
import { FC } from 'react';
import { Bar, BarChart, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type OrganizedResult = {date: string} & {[author: string]: number};
const chartColors = [
  '#A79C8E', // Muted Beige
  '#8EAF9D', // Soft Sage Green
  '#A0B9C6', // Muted Blue-Grey
  '#D0A9A0', // Dusty Rose
  '#E3CDAE', // Faded Sand
  '#B9A1A8', // Mauve Grey
  '#A3B4A2', // Muted Olive
  '#C2B5A5', // Warm Taupe
  '#9DA7B1', // Slate Blue
  '#B9C6AE', // Pastel Moss
];

function getAllAuthors(commits: GithubCommit[]): string[] {
  // Use a Set to store unique author names
  const authorsSet = new Set<string>();

  // Iterate through each commit and add the author to the Set
  for (const commit of commits) {
    const author = commit.author?.login ?? commit.commit.author?.name ?? commit.committer?.name ?? commit.committer?.login ?? 'unknown';
    authorsSet.add(author);
  }

  // Convert the Set to an array and return it
  return Array.from(authorsSet);
}


function organizeCommitsByDate(commits: GithubCommit[]): ({date: string} & {[author: string]: number})[] {
  // Create a map to hold intermediate results
  const groupedCommits: Record<string, Record<string, number>> = {};

  for (const commit of commits) {
    // Extract the date part (YYYY-MM-DD)
    const date = commit.commit.author?.date?.split('T')[0];
    if (!date) continue;

    // Initialize the date if not present in groupedCommits
    if (!groupedCommits[date]) {
      groupedCommits[date] = {};
    }

    // Increment the commit count for the author
    const author = commit.author?.login ?? commit.commit.author?.name ?? commit.committer?.name ?? commit.committer?.login ?? 'unknown';
    groupedCommits[date][author] = (groupedCommits[date][author] || 0) + 1;
  }

  const result: OrganizedResult[] = Object.entries(groupedCommits).map(
    ([date, authors]) => ({
      date,
      ...authors,
    } as OrganizedResult)
  );

  return result;
}

export const GithubCommitsChart: FC<{commits: GithubCommit[]}> = ({ commits }) => {
  return <ChartContainer
    config={{
      count: {
        label: 'Commits',
      },
    }}
    className="h-[400px]"
  >
    <ResponsiveContainer width={'200px'} height="100%">
      <BarChart data={organizeCommitsByDate(commits)}>
        <Legend/>
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          interval={1}
        />
        <YAxis allowDecimals={false}/>
        <ChartTooltip content={<ChartTooltipContent/>}/>
        {getAllAuthors(commits).map((name, index) =>
          <Bar key={name} dataKey={name} stackId="a" fill={chartColors[index]}/>
        )}
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>;
};