import React from 'react';
import { useLocation } from 'react-router-dom';
import EmployeeTableSkeleton from './EmployeeTableSkeleton';

const Skeleton = React.memo(() => {
  const location = useLocation();
  return (
    <div className="flex flex-col flex-auto dark:bg-gray-800">
      {(location?.pathname?.includes('dashboard') ||
        location?.pathname?.includes('analytics')) &&
        !location?.search?.includes('target') && (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 4 }, (_, index) => index + 1)?.map((_, i) => (
              <div
                key={`items-start-${i}`}
                className="flex flex-col gap-3 p-2  bg-white border border-gray-200 rounded-xl shadow animate-pulse dark:bg-gray-800 dark:border-gray-700 dark:border-none"
              >
                <div className="items-center flex flex-row ">
                  <div
                    className={`animate-pulse h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
                  ></div>
                  <div className="pl-2 flex flex-col">
                    <div className=" animate-pulse h-2  bg-gray-200 dark:bg-gray-700 items-center mb-1  dark:text-slate-100 w-50 truncate"></div>
                    <h2 className=" animate-pulse h-2 bg-gray-200 dark:bg-gray-700 "></h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      <>
        {location?.pathname?.includes('dashboard') &&
        !location?.search?.includes('target') ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((_, id) => {
              return (
                <div
                  key={`w-full-${id}`}
                  className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center justify-center">
                      <div className=" animate-pulse mr-2 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 w-10 h-8 rounded-lg flex items-center justify-center"></div>
                      <h1 className=" animate-pulse h-2 w-20 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 flex items-center  dark:text-slate-100"></h1>
                    </div>
                    <span className="animate-pulse h-4 w-10 whitespace-nowrap bg-gray-200 dark:bg-gray-700 dark:border-gray-700  px-2 py-0.5 rounded-full shadow-sm flex items-center"></span>
                  </div>
                  <div className="flex-1 flex flex-col justify-evenly">
                    {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                      (_, index) => (
                        <React.Fragment key={`w-9-${index}`}>
                          <div className="flex flex-row mb-2">
                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 rounded-full ">
                              <h1
                                className={`animate-pulse w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 dark:border-gray-700 flex items-center justify-center  col-span-0`}
                              ></h1>
                            </div>
                            <div className="p-2 flex flex-row justify-between w-full">
                              <div className="flex flex-col justify-between">
                                <span className=" animate-pulse h-2 w-10  bg-gray-200 dark:bg-gray-700 dark:border-gray-700 mb-2"></span>
                                <span className=" animate-pulse h-2 w-10 mb-1 flex items-center  bg-gray-200 dark:bg-gray-700 dark:border-gray-700 "></span>
                              </div>
                              <div className="items-center flex justify-end">
                                <span
                                  className={`animate-pulse h-2 w-10 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 `}
                                ></span>
                              </div>
                            </div>
                          </div>
                        </React.Fragment>
                      )
                    )}
                  </div>
                  <div className=" bottom-2 right-2 flex flex-col items-end ">
                    <span className="w-10 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 h-2"></span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <React.Fragment>
            {location?.pathname?.includes('analytics') ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                  (_, id) => {
                    return (
                      <div
                        key={`suspense-${id}`}
                        className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow animate-pulse dark:bg-gray-800 dark:border-gray-700"
                      >
                        <div className="flex flex-col">
                          <div className="h-3 w-25 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div
                          className="mx-auto w-44 h-44 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden"
                          style={{
                            background:
                              'conic-gradient(#e5e7eb 0% 40%, #ffffff 40% 41%, #e5e7eb 41% 75%, #ffffff 75% 76%, #e5e7eb 76% 100%)',
                          }}
                        >
                          <div
                            className="hidden dark:block absolute inset-0 rounded-full"
                            style={{
                              background:
                                'conic-gradient(#374151 0% 40%, #1f2937 40% 41%, #374151 41% 75%, #1f2937 75% 76%, #374151 76% 100%)',
                            }}
                          ></div>
                        </div>
                        <div className="flex flex-col mt-6">
                          <div className="h-3 w-25 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          <div className="h-3 w-25 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                          <div className="h-3 w-25 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <>
                {(location?.pathname?.includes('employees') ||
                  location?.search?.includes('target')) && (
                  <EmployeeTableSkeleton />
                )}
              </>
            )}
          </React.Fragment>
        )}
      </>
    </div>
  );
});

export default Skeleton;
