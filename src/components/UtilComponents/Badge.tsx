import type { BadgeProps } from '../../types/types';

export const Badge = ({ value }: BadgeProps) => {
  return (
    <div className="flex flex-col items-start">
      <div
        className="px-1 py-0 md:px-3 md:py-1
                    rounded-full
                     bg-green-100
                     text-green-700
                     text-[10px]
                     md:text-xs
                    font-semibold dark:bg-emerald-900/40 dark:text-emerald-400"
      >
        {value}
      </div>
    </div>
  );
};

export default Badge;
