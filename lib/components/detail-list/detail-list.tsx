'use client';

import { get } from 'lodash';
import { CheckCircle2, Clock, XCircle, } from 'lucide-react';
import { FC } from 'react';

export type DetailItem = {
  id: string;
  label: string;
  date: string;
  url?: string
  status?: 'success' | 'failure' | 'running' | 'pending' | 'unknown',
} & {[key: string]: unknown}


export type DetailListProps = {
  data: DetailItem[];
  columns: string[];
}

export const DetailList: FC<DetailListProps> = ({ data, columns }) => {

  // Filter and sort deployments
  const filteredEntries = data
  .sort((a, b) => {
    // Sort by selected field
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const successCount = filteredEntries.filter((d) => d.status === 'success').length;
  const failedCount = filteredEntries.filter((d) => d.status === 'failure').length;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (<>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">Total Deployments</div>
        <div className="text-2xl font-bold mt-1">{filteredEntries.length}</div>
      </div>
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">Success Rate</div>
        <div className="text-2xl font-bold mt-1 text-success">
          {filteredEntries.length > 0
            ? `${Math.round((successCount / filteredEntries.length) * 100)}%`
            : 'N/A'}
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">Success</div>
        <div className="text-2xl font-bold mt-1 text-success">
          {successCount ?? 'N/A'}
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="text-sm text-muted-foreground">Failed</div>
        <div className="text-2xl font-bold mt-1 text-success">
          {failedCount ?? 'N/A'}
        </div>
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
        <tr className="border-b sticky top-0">
          <th className="text-left py-3 px-4 font-medium">Label</th>
          <th className="text-left py-3 px-4 font-medium">Status</th>
          <th className="text-left py-3 px-4 font-medium cursor-pointer hover:text-primary">
            <div className="flex items-center">
              Date
            </div>
          </th>
          {columns.map((col) => (
            <th className="py-4 px-4 text-left" key={col}>
              <div className="inline-flex items-center">
                {col}
              </div>
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
        {filteredEntries
        .map((entry) => (
          <tr key={entry.id} className="border-b border-border/50 hover:bg-muted/50 relative">
            <td className="py-4 px-4">
              <div className="font-medium">
                <a href={entry.url} target={'_blank'}>
                  {entry.label}
                  <span className={'absolute top-0 bottom-0 left-0 right-0'}></span>
                </a>
              </div>
            </td>
            <td className="py-4 px-4">
              <div className="flex items-center text-success">
                {entry.status === 'success' && <CheckCircle2 className="text-green-500"/>}
                {entry.status === 'failure' && <XCircle className="text-red-500"/>}
                {entry.status === 'running' && <Clock className="text-yellow-500 animate-spin"/>}
                {entry.status === 'pending' && <Clock className="text-gray-500 animate-spin"/>}
                {entry.status === 'unknown' && <Clock className="text-gray-500 animate-spin"/>}
                <span className={'ml-1'}>{entry.status}</span>
              </div>

            </td>
            <td className="py-4 px-4">
              <div className="flex items-center">
                {formatDate(entry.date)}
              </div>
            </td>
            {columns.map((col) => (
              <td className="py-4 px-4 text-left" key={col}>
                <div className="inline-flex items-center">
                  {get(entry, col) as string}
                </div>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  </>)
    ;
};

