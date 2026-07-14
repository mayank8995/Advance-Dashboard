import { TextSearch } from 'lucide-react';
import React from 'react';
import { NO_RESULT_FOUND } from '../../utils/constants';
import type { DesktopTableProps } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';

export const DesktopTable = ({
  list,
  headersData,
  columnsData,
  handleSort,
  getSortIcon,
  rowsPerPage,
}: DesktopTableProps) => {
  const { isLoading } = useLoader();
  console.log('isloading>>', isLoading);
  return (
    <React.Fragment>
      <table
        className="hidden sm:table rounded-2xl
  shadow-lg
  border
  border-slate-200 m-2.5 dark:bg-slate-900 dark:border-slate-700  dark:shadow-slate-900/50 "
      >
        <thead className="bg-slate-100">
          {headersData?.length > 0 && (
            <tr className="cursor-pointer dark:bg-slate-800 dark:border-slate-700">
              {headersData?.map((header: any) => {
                return (
                  <th
                    key={header.key}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400"
                    onClick={() => handleSort(header?.key)}
                  >
                    {header?.value} {getSortIcon(header?.key)}
                  </th>
                );
              })}
            </tr>
          )}
        </thead>
        {!isLoading ? (
          <tbody className="divide-y divide-slate-200">
            {list?.length > 0 ? (
              list.map((row: any, index: number) => (
                <tr
                  key={`${row.id}-${index}`}
                  className=" hover:bg-blue-50 hover:transition-colors hover:duration-200 odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-800"
                >
                  {Object.keys(columnsData).map((columnsData, id) => (
                    <td
                      key={id}
                      className="px-6 py-4 font-medium text-slate-800 dark:text-slate-400"
                    >
                      {Array.isArray(row[columnsData]) &&
                      row[columnsData]?.length > 0
                        ? row[columnsData].map((item: string) => (
                            <div key={row[columnsData] + item}>{item}</div>
                          ))
                        : row[columnsData]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="col-span-8  text-center py-8">
                  <h1 className="dark:text-slate-100 text-slate-800 flex flex-row justify-center items-center">
                    <TextSearch className="pr-1" />
                    <span>{NO_RESULT_FOUND}</span>
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        ) : (
          <tbody className="divide-y divide-gray-100 border-t border-gray-100 animate-pulse">
            {Array.from({ length: rowsPerPage }, (_, index) => index + 1)?.map(
              (_, id) => {
                return (
                  <tr key={`${id + rowsPerPage}`} className="hover:bg-gray-50">
                    {Array.from(
                      { length: headersData?.length },
                      (_, index) => index + 1
                    )?.map((_, i) => {
                      return (
                        <td
                          key={`${i + 1 + id + rowsPerPage}`}
                          className="px-6 py-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-24 rounded bg-gray-200"></div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              }
            )}
          </tbody>
        )}
      </table>
    </React.Fragment>
  );
};

export default DesktopTable;
