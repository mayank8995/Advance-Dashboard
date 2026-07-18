import type { ReviewReasonBadgeProps } from '../../types/types';
import {
  reviewColors,
  reviewColorsDark,
  reviewtextColors,
  reviewtextColorsDark,
  statusColors,
} from '../../utils/constants';

export const ReviewReasonBadge = ({ value }: ReviewReasonBadgeProps) => {
  console.log('value>>>', value);
  if (!value) return;
  console.log(
    value.toLocaleLowerCase(),
    statusColors[value.toLocaleLowerCase()]
  );
  return (
    <div className="flex flex-col items-start p-1">
      <div
        className={`px-1 py-0 md:px-3 md:py-1
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

export default ReviewReasonBadge;
