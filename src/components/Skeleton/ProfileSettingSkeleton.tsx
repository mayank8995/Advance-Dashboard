import React from 'react';

const ProfileSettingSkeleton = React.memo(() => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950">
      <div className="p-3 sm:p-4">
        <div className="mb-6">
          <div className="h-6 w-40 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
          <div className="mt-2 h-3 w-64 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>

        <div
          className="
        overflow-hidden rounded-2xl
        border border-slate-200
        bg-white shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
        >
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-6">
            <div
              className="
            rounded-2xl
            border border-slate-200
            bg-slate-50
            p-6
            dark:border-slate-800
            dark:bg-slate-950
          "
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-28 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="flex flex-col items-center justify-center gap-4">
                <div
                  className="
                h-32 w-32
                animate-pulse rounded-full
                border-4 border-white
                bg-slate-200
                shadow-lg
                dark:border-slate-800
                dark:bg-slate-800
              "
                />

                <div className="flex flex-col items-center gap-2">
                  <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-2 sm:p-4">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="h-4 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="space-y-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex flex-col gap-2">
                    <div className="h-3 w-20 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                    <div className="h-10 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-slate-300 dark:border-slate-700" />

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="h-3 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-dashed border-slate-300 dark:border-slate-700" />

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-5 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-36 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex flex-col gap-2">
                  <div className="h-3 w-24 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" />
                  <div className="h-10 w-full animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfileSettingSkeleton;
