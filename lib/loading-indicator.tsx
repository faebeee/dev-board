'use client';

import { FC } from 'react';

export const LoadingIndicator: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900 dark:border-gray-100" />
    </div>
  );
};

