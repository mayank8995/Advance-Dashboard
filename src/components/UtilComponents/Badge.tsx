import React from 'react';
import type { BadgeProps } from '../../types/types';

const Badge = ({ value }: BadgeProps) => {
  return (
    <div className="flex flex-col items-start flex-1 min-w-0">
      <div
        className="shrink-0 px-1 py-0 md:px-3 md:py-1
                    rounded-full
                     bg-green-100
                     text-green-700
                     text-[10px]
                     md:text-xs
                    font-semibold dark:bg-emerald-900/40 dark:text-emerald-400 "
      >
        {value}
      </div>
    </div>
  );
};

export default React.memo(Badge);
