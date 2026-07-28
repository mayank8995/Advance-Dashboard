import { TextSearch } from 'lucide-react';
import React, { useEffect } from 'react';
import { className, NO_RESULT_FOUND } from '../../utils/constants';
import type { DesktopTableProps } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';
import FormField from '../Form/FormField';

export const DesktopTable = ({
  list,
  headersData,
  columnsData,
  handleSort,
  getSortIcon,
  rowsPerPage,
  tableQueryParams,
  selectedRow,
  setSelectedRow,
  handleOnChange,
}: DesktopTableProps) => {
  const { isLoading } = useLoader();
  // const { selectedRow, setSelectedRow, handleOnChange } = useCheckBox(list);
  // to do - uses cases of when checkbox should be selected or not.
  /** const {
    search: _search,
    limit: _limit,
    ...restParams
  } = tableQueryParams || {};
  const restParamsKeys = JSON.stringify(restParams);*/
  useEffect(() => {
    setSelectedRow(new Set());
  }, [tableQueryParams]);

  return (
    <React.Fragment>
      <table
        className="hidden lg:table rounded-2xl
  shadow-lg
  border
  border-slate-200 m-2.5 dark:bg-slate-900 dark:border-slate-700  dark:shadow-slate-900/50 "
      >
        <thead className="bg-slate-100">
          {headersData?.length > 0 && (
            <tr className="cursor-pointer dark:bg-slate-800 dark:border-slate-700">
              <th className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400">
                <FormField
                  name={'selectAll'}
                  type={'checkbox'}
                  id={'selectAll'}
                  checked={selectedRow.has('selectAll')}
                  onChange={handleOnChange}
                  className={`${className} cursor-pointer`}
                />
              </th>
              {headersData?.map((header) => {
                return (
                  <th
                    key={header.key}
                    className="px-4 py-4 text-left text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400"
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
              list?.map((row: any, index: number) => (
                <tr
                  key={`${row.id}-${index * 2}`}
                  className={`hover:bg-blue-50 hover:transition-colors hover:duration-200 dark:hover:bg-slate-400/50 odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-800`}
                >
                  {/* {Object.keys(columnsData)?.map((columnsData, id) => (
                    <td
                      key={id}
                      className="px-6 py-4 font-medium text-slate-800 dark:text-slate-400"
                    >
                      {Array.isArray(row[columnsData]) &&
                      row[columnsData]?.length > 0
                        ? row[columnsData]?.map((item: string) => (
                            <div key={row[columnsData] + item}>{item}</div>
                          ))
                        : row[columnsData]}
                    </td>
                  ))} */}
                  {/* {Hooking checkboxlist into list as checkbox list is derived from list} */}
                  <td
                    id={row?.id}
                    className="px-4 py-4 font-medium text-slate-800 dark:text-slate-400"
                  >
                    <FormField
                      name={row?.id}
                      type={'checkbox'}
                      id={row?.id}
                      checked={selectedRow.has(String(row?.id))}
                      onChange={handleOnChange}
                      className={`${className} cursor-pointer`}
                    />
                  </td>
                  {columnsData?.map((coloumn, id: number) => (
                    <td
                      key={id}
                      className="px-4 py-4 font-medium text-slate-800 dark:text-slate-400"
                    >
                      {Array.isArray(row[coloumn?.key]) &&
                      row[coloumn?.key]?.length > 0 ? (
                        row[coloumn?.key]?.map((item: string) => (
                          <>
                            {!coloumn?.render ? (
                              <div key={row[coloumn?.key] + item}>{item}</div>
                            ) : (
                              coloumn?.render(item)
                            )}
                          </>
                        ))
                      ) : (
                        <>
                          {' '}
                          {!coloumn?.render
                            ? row[coloumn?.key]
                            : coloumn?.render(row[coloumn?.key])}{' '}
                        </>
                      )}
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
                          className="px-4 py-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
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
