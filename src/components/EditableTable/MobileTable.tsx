import { TextSearch } from 'lucide-react';
import MobileViewCardForTable from './MobileViewCardForTable';
import { NO_RESULT_FOUND } from '../../utils/constants';
import type { MobileTableProps } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';

export const MobileTable = ({
  list,
  rowsPerPage,
  columnsData,
  tableQueryParams,
}: MobileTableProps) => {
  const { isLoading } = useLoader();
  return (
    <div className="lg:hidden pl-2 pr-2">
      <>
        {!isLoading ? (
          <>
            {list?.length > 0 ? (
              <MobileViewCardForTable
                list={list}
                rowsPerPage={rowsPerPage}
                columnsData={columnsData}
                tableQueryParams={tableQueryParams}
              />
            ) : (
              <div className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2   dark:border-slate-900/50">
                <h1 className="dark:text-slate-100 text-slate-800">
                  <span className="flex items-center justify-center">
                    <TextSearch className="pr-1" />
                    {NO_RESULT_FOUND}
                  </span>
                </h1>
              </div>
            )}
          </>
        ) : (
          <>
            {Array.from({ length: rowsPerPage }, (_, index) => index + 1)?.map(
              (_, id) => {
                return (
                  <div
                    key={`${id + rowsPerPage}`}
                    className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2  odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-900/50 "
                  >
                    <div className="animate-pulse">
                      <div className="flex items-center gap-3">
                        <h1 className={`h-9 w-9 rounded-full bg-gray-200`}></h1>
                        <h2 className="h-4 w-48 rounded bg-gray-200"></h2>
                      </div>
                    </div>
                    {Array.from(
                      { length: columnsData?.length },
                      (_, index) => index + 1
                    )?.map((_, i) => {
                      return (
                        <div
                          key={`${i + 1 + id + rowsPerPage}`}
                          className="animate-pulse"
                        >
                          <div className={`grid grid-cols-2 gap-y-1 text-xs`}>
                            <h2 className="h-4 w-25 rounded bg-gray-200"></h2>
                            <h2 className="h-4 w-35 rounded bg-gray-200"></h2>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}
          </>
        )}
      </>
    </div>
  );
};

export default MobileTable;
