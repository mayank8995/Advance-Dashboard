import {
  ArrowUpDown,
  Funnel,
  SquareChevronLeft,
  SquareChevronRight,
} from 'lucide-react';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const Skeleton = () => {
  const location = useLocation();
  console.log(location, location?.search?.includes('target'));
  return (
    <div className="flex flex-col flex-auto dark:bg-gray-800">
      {(location?.pathname?.includes('dashboard') ||
        location?.pathname?.includes('analytics')) &&
        !location?.search?.includes('target') && (
          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {Array.from({ length: 4 }, (_, index) => index + 1)?.map((_, i) => (
              <div
                key={`items-start-${i}`}
                className="items-start flex flex-col gap-3 p-2 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 bg-white border border-gray-200 rounded-xl shadow animate-pulse dark:bg-gray-800 dark:border-gray-700 dark:border-none"
              >
                <div className="items-center flex flex-row ">
                  <div
                    className={`animate-pulse h-10 w-10 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
                  ></div>
                  <div className="pl-2 flex flex-col">
                    <div className=" animate-pulse h-2  bg-gray-200 dark:bg-gray-700 items-center mb-1 text-sm text-slate-500 font-medium dark:text-slate-100 w-50 truncate"></div>
                    <h2 className=" animate-pulse h-2 bg-gray-200 dark:bg-gray-700 text-xl font-bold text-gray-200 drop-shadow-sm "></h2>
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
                      <h1 className=" animate-pulse h-2 w-20 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 flex items-center text-lg font-bold dark:text-slate-100"></h1>
                    </div>
                    <span className="animate-pulse h-4 w-10 whitespace-nowrap bg-gray-200 dark:bg-gray-700 dark:border-gray-700 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center"></span>
                  </div>
                  <div className="flex-1 flex flex-col justify-evenly">
                    {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                      (_, index) => (
                        <React.Fragment key={`w-9-${index}`}>
                          <div className="flex flex-row mb-2">
                            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 rounded-full ">
                              <h1
                                className={`animate-pulse w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 dark:border-gray-700 text-white font-bold text-sm flex items-center justify-center  col-span-0`}
                              ></h1>
                            </div>
                            <div className="p-2 flex flex-row justify-between w-full">
                              <div className="flex flex-col justify-between">
                                <span className=" animate-pulse h-2 w-10 font-bold text-sm bg-gray-200 dark:bg-gray-700 dark:border-gray-700 mb-2"></span>
                                <span className=" animate-pulse h-2 w-10 mb-1 flex items-center text-xs text-slate-500 font-bold dark:text-slate-300 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 "></span>
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
                  <div className=" bottom-2 right-2 flex flex-col items-end text-sm font-bold">
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
                  <>
                    <div className="min-h-screen bg-slate-50 p-4 dark:bg-gray-800">
                      <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex-1 overflow-x-auto dark:bg-slate-950 dark:border-none">
                        <div className="sm:hidden px-6 py-4">
                          <div className="relative bg-gray-200 dark:bg-gray-700 w-full h-6"></div>
                        </div>
                        <div className="mt-4 flex flex-row items-center justify-between">
                          <div className="flex-1 justify-between  flex items-center px-6 pb-4">
                            <div className="flex flex-row items-center">
                              <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 w-10 h-5">
                                <label className=" hidden sm:flex text-sm font-bold dark:text-slate-100 pr-2"></label>
                              </div>
                              {
                                <div className="pl-2 flex items-center">
                                  <div className="cursor-pointer">
                                    <Funnel className="pl-2 text-gray-600 dark:text-gray-100" />
                                  </div>
                                  <div className="flex sm:hidden">
                                    {
                                      <ArrowUpDown className="pl-2 text-gray-600 dark:text-gray-100" />
                                    }
                                  </div>
                                </div>
                              }
                            </div>
                            <div className="flex justify-center items-center">
                              <div>
                                <SquareChevronLeft />
                              </div>
                              <span className="text-xs md:text-sm font-bold  dark:text-slate-100"></span>
                              <div>
                                <SquareChevronRight />
                              </div>
                            </div>
                          </div>
                          <div className="hidden sm:flex px-6 pb-4 ">
                            <div className="relative bg-gray-200 dark:bg-gray-700 w-40 h-6">
                              <div />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <table className="hidden sm:table rounded-2xl shadow-lg border border-slate-200 m-2.5 dark:bg-slate-900 dark:border-slate-700  dark:shadow-slate-900/50">
                            <thead className=" bg-slate-100">
                              <tr className="cursor-pointer bg-gray-200 dark:bg-gray-700 dark:border-slate-700">
                                {Array.from(
                                  { length: 8 },
                                  (_, index) => index + 1
                                )?.map((_, id) => {
                                  return (
                                    <th
                                      key={id + 'bg-gray'}
                                      className="animate-pulse bg-gray-300  dark:bg-gray-700 px-6 py-4 h-5 w-5"
                                    >
                                      {/* {'DASDA'} */}
                                    </th>
                                  );
                                })}
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 border-t border-gray-100 animate-pulse">
                              {Array.from(
                                { length: 5 },
                                (_, index) => index + 1
                              )?.map((_, id) => {
                                return (
                                  <tr
                                    key={`${id + 5}`}
                                    className="hover:bg-gray-50"
                                  >
                                    {Array.from(
                                      { length: 8 },
                                      (_, index) => index + 1
                                    )?.map((_, i) => {
                                      return (
                                        <td
                                          key={`${i + 1 + id + 8}`}
                                          className="px-6 py-4"
                                        >
                                          <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <div className="sm:hidden pl-2 pr-2">
                            {Array.from(
                              { length: 5 },
                              (_, index) => index + 1
                            )?.map((_, id) => {
                              return (
                                <div
                                  key={`${id + 5}`}
                                  className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2  odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-900/50 "
                                >
                                  <div className="animate-pulse">
                                    <div className="flex items-center gap-3">
                                      <h1
                                        className={`h-9 w-9 rounded-full bg-gray-200`}
                                      ></h1>
                                      <h2 className="h-4 w-48 rounded bg-gray-200"></h2>
                                    </div>
                                  </div>
                                  {Array.from(
                                    { length: 8 },
                                    (_, index) => index + 1
                                  )?.map((_, i) => {
                                    return (
                                      <div
                                        key={`${i + 1 + id + 5}`}
                                        className="animate-pulse"
                                      >
                                        <div
                                          className={`grid grid-cols-2 gap-y-1 text-xs`}
                                        >
                                          <h2 className="h-4 w-25 rounded bg-gray-200"></h2>
                                          <h2 className="h-4 w-35 rounded bg-gray-200"></h2>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </React.Fragment>
        )}
      </>
    </div>
  );
};

export default Skeleton;
