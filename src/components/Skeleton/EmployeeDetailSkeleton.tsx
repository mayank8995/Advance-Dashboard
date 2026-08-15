import React from 'react';

const EmployeeDetailSkeleton = () => {
  return (
    <div
      className="
    p-3 sm:p-4
    w-full sm:w-115 md:w-125 lg:w-135
    h-full
    overflow-y-auto
    bg-white dark:bg-slate-900
    text-slate-900 dark:text-slate-100
    shadow-2xl
    fixed z-300 right-0 top-0
    animate-pulse
  "
    >
      <div
        className="
      flex flex-row items-center justify-between
      pb-3
      border-b border-slate-200
      dark:border-slate-700
    "
      >
        <div
          className="
        h-5 w-32 sm:w-36
        rounded-md
        bg-slate-200
        dark:bg-slate-700
      "
        />

        <div
          className="
        w-8 h-8
        rounded-lg
        bg-slate-100
        dark:bg-slate-800
      "
        />
      </div>

      <div
        className="
      grid grid-cols-[auto_minmax(0,1fr)_auto]
      gap-3 sm:gap-4
      items-center
      pt-4 pb-4
    "
      >
        <div
          className="
        w-14 h-14
        sm:w-16 sm:h-16
        rounded-full
        shrink-0
        bg-slate-200
        dark:bg-slate-700
        ring-2
        ring-slate-200
        dark:ring-slate-700
      "
        />

        <dl className="min-w-0">
          <dd
            className="
          h-4
          w-28 sm:w-36
          rounded-md
          bg-slate-200
          dark:bg-slate-700
        "
          />

          <dd
            className="
          mt-2
          h-3
          w-36 sm:w-44
          rounded-md
          bg-slate-200
          dark:bg-slate-700
        "
          />

          <dd
            className="
          mt-2
          h-3
          w-24 sm:w-32
          rounded-md
          bg-slate-200
          dark:bg-slate-700
        "
          />
        </dl>
        <div
          className="
        shrink-0
        h-6 w-16
        rounded-full
        bg-slate-200
        dark:bg-slate-700
      "
        />
      </div>

      {/* Accordion content */}
      <div className="p-2 sm:p-3 flex-1 flex flex-col">
        <div className="space-y-2.5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <React.Fragment key={item}>
              <div
                className="
              h-14
              w-full
              rounded-2xl
              border border-slate-200
              bg-slate-50
              shadow-sm
              dark:border-slate-700
              dark:bg-slate-800
            "
              >
                <div className="flex h-full items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                    h-5 w-5
                    rounded-md
                    bg-slate-200
                    dark:bg-slate-700
                  "
                    />

                    <div
                      className="
                    h-4 w-24
                    rounded-md
                    bg-slate-200
                    dark:bg-slate-700
                  "
                    />
                  </div>

                  <div
                    className="
                  h-4 w-4
                  rounded
                  bg-slate-200
                  dark:bg-slate-700
                "
                  />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailSkeleton;
