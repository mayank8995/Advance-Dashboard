import React from 'react';

const FilterModalSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/10 flex flex-col max-h-[85vh] md:h-125 md:max-h-125 shadow-sm  fixed z-300 left-0 right-0 bottom-0 md:absolute md:top-[50%] md:left-[50%] md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-t-2xl md:rounded-2xl">
      <div className="flex flex-row justify-between items-center p-4 border-b border-b-slate-200 dark:border-b-white/10"></div>

      <div className="flex flex-1 overflow-y-auto animate-pulse">
        <div className="flex flex-col border-r border-r-slate-200 dark:border-r-white/10 animate-pulse">
          {[1, 2, 3, 4]?.map((item) => {
            return (
              <div
                key={`${item}-tabId`}
                className="bg-gray-200 dark:bg-gray-700 animate-pulse h-10.5 cursor-pointer text-xs w-28 wrap-anywhere flex items-center justify-center border-slate-200 dark:border-white/10"
              ></div>
            );
          })}
        </div>
        <div className="flex flex-col animate-pulse">
          {[1, 2, 3, 4]?.map((item, index: number) => (
            <React.Fragment key={`${item}-filters`}>
              {
                <div
                  className="transition-all duration-200 ease-out outline-none  p-2 relative flex flex-wrap items-center overflow-auto overflow-x-auto   "
                  itemID={`${index}`}
                >
                  <div
                    className={`w-15 bg-gray-200 dark:bg-gray-700 animate-pulse cursor-pointer m-1 inline-flex items-center gap-1.5 
                                                px-4 py-2 rounded-full font-medium whitespace-nowrap 
                                                border transition-all duration-150 
                                                text-xs
                                            border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/25'
                                                `}
                  ></div>
                  <div
                    className={`w-15 bg-gray-200 dark:bg-gray-700 animate-pulse cursor-pointer m-1 inline-flex items-center gap-1.5 
                                                px-4 py-2 rounded-full font-medium whitespace-nowrap 
                                                border transition-all duration-150 
                                                text-xs
                                            border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/25'
                                                `}
                  ></div>
                  <div
                    className={`w-15 bg-gray-200 dark:bg-gray-700 animate-pulse cursor-pointer m-1 inline-flex items-center gap-1.5 
                                                px-4 py-2 rounded-full font-medium whitespace-nowrap 
                                                border transition-all duration-150 
                                                text-xs
                                            border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/25'
                                                `}
                  ></div>
                </div>
              }
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterModalSkeleton;
