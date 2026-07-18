import type { StatusBadgeProps } from '../../types/types';
import {
  statusColors,
  statusColorsDark,
  textColors,
  textColorsDark,
} from '../../utils/constants';

export const StatusBadge = ({ value }: StatusBadgeProps) => {
  if (!value) return;
  console.log(
    value.toLocaleLowerCase(),
    statusColors[value.toLocaleLowerCase()]
  );
  return (
    <div className="flex flex-col items-start">
      <div
        className={`px-1 py-0 md:px-3 md:py-1
                    rounded-full
                    ${statusColors[value.toLocaleLowerCase()]}
                     ${textColors[value.toLocaleLowerCase()]}
                     text-[10px]
                     md:text-xs
                    font-semibold dark:${statusColorsDark[value.toLocaleLowerCase()]} dark:${textColorsDark[value.toLocaleLowerCase()]}`}
      >
        {value}
      </div>
    </div>
  );
};

export default StatusBadge;
