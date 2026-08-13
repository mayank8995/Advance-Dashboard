import {
  ArrowUpDown,
  Funnel,
  SquareChevronLeft,
  SquareChevronRight,
} from 'lucide-react';
import React from 'react';

const EmployeeTableSkeleton = React.memo(() => {
  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-4 dark:bg-slate-950">
      <div
        className="
      min-h-full overflow-hidden rounded-2xl
      border border-slate-200
      bg-white shadow-sm
      dark:border-slate-800
      dark:bg-slate-900
    "
      >
        <div className="lg:hidden px-4 sm:px-6 pt-4">
          <div className="h-6 w-full rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        </div>

        <div className="mt-4 flex flex-row items-center justify-between">
          <div className="flex flex-1 items-center justify-between px-4 pb-4 sm:px-6">
            <div className="flex items-center">
              <div
                className="
              h-5 w-10 rounded-md
              bg-slate-200
              dark:bg-slate-800
              animate-pulse
            "
              />

              <div className="ml-3 flex items-center gap-1">
                <Funnel
                  className="text-slate-300 dark:text-slate-700"
                  size={18}
                />

                <div className="lg:hidden">
                  <ArrowUpDown
                    className="text-slate-300 dark:text-slate-700"
                    size={18}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <SquareChevronLeft className="text-slate-300 dark:text-slate-700" />

              <span
                className="
              h-4 w-10 rounded-md
              bg-slate-200
              dark:bg-slate-800
              animate-pulse
            "
              />

              <SquareChevronRight className="text-slate-300 dark:text-slate-700" />
            </div>
          </div>

          <div className="hidden lg:flex px-6 pb-4">
            <div
              className="
            h-6 w-40 rounded-md
            bg-slate-200
            dark:bg-slate-800
            animate-pulse
          "
            />
          </div>
        </div>

        <div className="flex flex-col">
          <table
            className="
          hidden lg:table
          mx-3 mb-3
          w-[calc(100%-1.5rem)]
          overflow-hidden
          rounded-xl
          border border-slate-200
          dark:border-slate-700
        "
          >
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                {Array.from({ length: 8 }, (_, index) => index + 1).map(
                  (_, id) => (
                    <th key={`${id}bg-gray`} className="px-6 py-4">
                      <div
                        className="
                      h-4 w-24
                      rounded-md
                      bg-slate-200
                      dark:bg-slate-700
                      animate-pulse
                    "
                      />
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {Array.from({ length: 6 }, (_, index) => index + 1).map(
                (_, id) => (
                  <tr key={`${id + 5}`}>
                    {Array.from({ length: 8 }, (_, index) => index + 1).map(
                      (_, i) => (
                        <td key={`${i + 1 + id + 8}`} className="px-6 py-4">
                          <div
                            className={`
                        h-4 rounded-md
                        bg-slate-200
                        dark:bg-slate-700
                        animate-pulse
                        ${i === 0 ? 'w-32' : 'w-24'}
                      `}
                          />
                        </td>
                      )
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>

          <div className="lg:hidden space-y-3 px-3 pb-3">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((_, id) => (
              <div
                key={`${id + 5}`}
                className="
                overflow-hidden rounded-2xl
                border border-slate-200
                bg-white
                p-4
                shadow-sm
                dark:border-slate-800
                dark:bg-slate-900
              "
              >
                <div className="flex items-center gap-3 pb-4">
                  <div
                    className="
                    h-10 w-10 shrink-0 rounded-full
                    bg-slate-200
                    dark:bg-slate-700
                    animate-pulse
                  "
                  />

                  <div className="flex-1 space-y-2">
                    <div
                      className="
                      h-4 w-40 max-w-full rounded-md
                      bg-slate-200
                      dark:bg-slate-700
                      animate-pulse
                    "
                    />

                    <div
                      className="
                      h-3 w-28 rounded-md
                      bg-slate-200
                      dark:bg-slate-700
                      animate-pulse
                    "
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 8 }, (_, index) => index + 1).map(
                    (_, i) => (
                      <div
                        key={`${i + 1 + id + 5}`}
                        className="
                      grid grid-cols-2
                      gap-3
                    "
                      >
                        <div
                          className="
                        h-3 w-20
                        rounded-md
                        bg-slate-200
                        dark:bg-slate-700
                        animate-pulse
                      "
                        />

                        <div
                          className="
                        h-3 w-28
                        justify-self-end
                        rounded-md
                        bg-slate-200
                        dark:bg-slate-700
                        animate-pulse
                      "
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default EmployeeTableSkeleton;
