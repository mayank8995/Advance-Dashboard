import React from 'react';

const EmployeeDetailSkeleton = () => {
  return (
    <div className="p-4 h-full max-h-full overflow-auto w-screen md:w-fit animate-pulse rounded-lg shadow bg-slate-300 dark:bg-slate-950 border border-slate-200 dark:border-white/10 fixed z-300 right-0 top-0">
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 pt-4 pb-4">
        <div className="w-15 h-15 rounded-full ring-4 ring-white shadow-xl overflow-hidden animate-pulse">
          <div className="aspect-square w-full h-full object-cover" />
        </div>
        <dl className="bg-slate-200 dark:bg-gray-800 rounded-2xl">
          <dd className="m-2 h-2 w-10 text-sm font-bold leading-normal dark:text-white rounded-2xl bg-linear-to-br from-white to-indigo-50/40 border animate-pulse border-slate-100 dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-slate-900/50 "></dd>
          <dd className="m-2 h-2 w-10 text-xs whitespace-nowrap overflow-hidden text-ellipsis font-semibold dark:text-white rounded-2xl bg-linear-to-br from-white to-indigo-50/40 border animate-pulse border-slate-100 dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-slate-900/50 "></dd>
          <dd className="m-2 h-2 w-10 text-xs whitespace-nowrap overflow-hidden text-ellipsis text-slate-600 font-semibold animate-pulse rounded-2xl bg-linear-to-br from-white to-indigo-50/40 border border-slate-100 dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-slate-900/50"></dd>
        </dl>
        <div></div>
      </div>
      <div className="p-4 flex-1 flex flex-col bg-slate-200 dark:bg-gray-800 h-full rounded-2xl">
        <div className="animate-pulse flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => {
            return (
              <React.Fragment key={i ** 2}>
                <div
                  className={
                    'h-15 w-full mt-2 animate-pulse rounded-2xl bg-linear-to-br from-white to-indigo-50/40 border border-slate-100 dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-slate-900/50 p-2 flex flex-col gap-3 shadow-sm'
                  }
                ></div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailSkeleton;
