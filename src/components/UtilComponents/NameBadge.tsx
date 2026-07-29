import type { NameBadgeProps } from '../../types/types';

export const NameBadge = ({ value }: NameBadgeProps) => {
  if (!value) {
    return;
  }
  return (
    // <span className="inline-flex items-center gap-2 rounded-full bg-[#534ab7] dark:bg-[#534ab7] px-3 py-1 text-sm font-medium text-slate-200">
    //   <span className="flex h-6 w-6 -ml-2 items-center justify-center rounded-full bg-[#6d68a9] text-xs font-semibold text-white">
    //     {value.charAt(0)}
    //   </span>
    //   {value}
    // </span>
    <div className="flex items-center">
      <h1
        className={` bg-[#534ab7] dark:bg-[#534ab7] col-span-0 w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center`}
      >
        {value
          ?.split(' ')
          .map((n: string) => n[0])
          .join('')}
      </h1>
      <h2 className="pl-2 text-slate-800 dark:text-slate-300">{value}</h2>
    </div>
  );
};

export default NameBadge;
