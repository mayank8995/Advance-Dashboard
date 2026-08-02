import React from 'react';
import type { ReviewReasonBadgeProps } from '../../types/types';
import {
  reviewColors,
  reviewColorsDark,
  reviewtextColors,
  reviewtextColorsDark,
} from '../../utils/constants';

const ReviewReasonBadge = ({ value }: ReviewReasonBadgeProps) => {
  if (!value) {
    return;
  }

  return (
    <div className="flex flex-col items-start p-1 flex-1 min-w-0">
      <div
        className={`shrink-0 px-1 py-0 md:px-3 md:py-1
                    rounded-full
                    ${reviewColors[value.toLocaleLowerCase()]}
                     ${reviewtextColors[value.toLocaleLowerCase()]}
                     text-[10px]
                     md:text-xs
                    font-semibold dark:${reviewColorsDark[value.toLocaleLowerCase()]} dark:${reviewtextColorsDark[value.toLocaleLowerCase()]}`}
      >
        {value}
      </div>
    </div>
  );
};

export default React.memo(ReviewReasonBadge);
