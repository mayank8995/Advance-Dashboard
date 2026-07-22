import {
  ArrowUpDown,
  Funnel,
  SquareChevronLeft,
  SquareChevronRight,
} from 'lucide-react';

export const EmployeeTableSkeleton = () => {
  return (
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
                {Array.from({ length: 8 }, (_, index) => index + 1)?.map(
                  (_, id) => {
                    return (
                      <th
                        key={id + 'bg-gray'}
                        className="animate-pulse bg-gray-300  dark:bg-gray-700 px-6 py-4 h-5 w-5"
                      >
                        {/* {'DASDA'} */}
                      </th>
                    );
                  }
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 border-t border-gray-100 animate-pulse">
              {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                (_, id) => {
                  return (
                    <tr key={`${id + 5}`} className="hover:bg-gray-50">
                      {Array.from({ length: 8 }, (_, index) => index + 1)?.map(
                        (_, i) => {
                          return (
                            <td key={`${i + 1 + id + 8}`} className="px-6 py-4">
                              <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </td>
                          );
                        }
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
          <div className="sm:hidden pl-2 pr-2">
            {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
              (_, id) => {
                return (
                  <div
                    key={`${id + 5}`}
                    className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2  odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-900/50 "
                  >
                    <div className="animate-pulse">
                      <div className="flex items-center gap-3">
                        <h1 className={`h-9 w-9 rounded-full bg-gray-200`}></h1>
                        <h2 className="h-4 w-48 rounded bg-gray-200"></h2>
                      </div>
                    </div>
                    {Array.from({ length: 8 }, (_, index) => index + 1)?.map(
                      (_, i) => {
                        return (
                          <div
                            key={`${i + 1 + id + 5}`}
                            className="animate-pulse"
                          >
                            <div className={`grid grid-cols-2 gap-y-1 text-xs`}>
                              <h2 className="h-4 w-25 rounded bg-gray-200"></h2>
                              <h2 className="h-4 w-35 rounded bg-gray-200"></h2>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTableSkeleton;
