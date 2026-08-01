import React, { useEffect } from 'react';
import type { MobileTableProps, TableTypeProps } from '../../types/types';
import { bgColors, EMPLOYEE, gradients, TOP_PROJ } from '../../utils/constants';
import FormField from '../Form/FormField';
import { useModal } from '../../context/ModalContext';
import DetailModal from '../Overlay/DetailModal';

function MobileViewCardForTable<T extends TableTypeProps>({
  list,
  columnsData,
  tableQueryParams,
  selectedRow,
  setSelectedRow,
  handleOnChange,
}: MobileTableProps<T>) {
  const { openModal } = useModal();

  // const { selectedRow, setSelectedRow, handleOnChange } = useCheckBox(list);

  // to do - uses cases of when checkbox should be selected or not.
  /** const {
    search: _search,
    limit: _limit,
    ...restParams
  } = tableQueryParams || {};
  const restParamsKeys = JSON.stringify(restParams);*/
  const isTopProj = tableQueryParams?.tableType === TOP_PROJ;

  useEffect(() => {
    setSelectedRow(new Set());
  }, [tableQueryParams]);

  function getRowCss(value: string) {
    const initialCss = `grid grid-cols-2 gap-y-2 text-xs`;
    if (value === 'id') {
      return 'hidden';
    }
    return initialCss;
  }
  return (
    <>
      {list?.map((row, index: number) => (
        <div
          key={`${row.id}-data`}
          className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2  odd:bg-white even:bg-slate-50 dark:odd:bg-slate-900 dark:even:bg-slate-800/40 dark:border-slate-900/50 "
        >
          {columnsData?.map((coloumn) => {
            const value = row[coloumn?.key];
            return (
              <div key={coloumn.key}>
                {coloumn?.key === 'name' && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 shrink-0">
                      <h1
                        className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center dark:bg-none dark:${bgColors[index % bgColors.length]}`}
                      >
                        {String(value)
                          ?.split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </h1>
                      <button
                        type="button"
                        className={
                          !isTopProj ? 'cursor-pointer' : 'cursor-default'
                        }
                        onClick={(event) => {
                          if (isTopProj) {
                            event.preventDefault();
                            return;
                          }
                          openModal(DetailModal, {
                            id: row.id,
                            tableQueryParams,
                          });
                        }}
                      >
                        <h2 className="text-slate-800 dark:text-slate-300">
                          {Array.isArray(value) && value?.length > 0
                            ? value[0]
                            : value}
                        </h2>
                      </button>
                    </div>
                    <FormField
                      className={`cursor-pointer w-auto`}
                      name={String(row?.id)}
                      type={'checkbox'}
                      id={String(row?.id)}
                      checked={selectedRow.has(String(row?.id))}
                      onChange={handleOnChange}
                    />
                  </div>
                )}
                <>
                  {coloumn?.key !== 'name' && (
                    <div className={getRowCss(coloumn?.key)}>
                      <h2 className="text-slate-500">
                        {coloumn?.header
                          ?.split(' ')
                          .map(
                            (n: string) => n[0] + n.substring(1).toLowerCase()
                          )
                          .join(' ')}
                      </h2>
                      <h2 className="pl-2 text-slate-800 dark:text-slate-300">
                        {Array.isArray(value) && value?.length > 0 ? (
                          value?.map((item: string, index: number) => (
                            <>
                              <div key={index + value.length}>
                                {!coloumn?.render
                                  ? item
                                  : coloumn?.render(item)}
                              </div>
                            </>
                          ))
                        ) : (
                          <>
                            {!coloumn?.render
                              ? row[coloumn?.key]
                              : coloumn?.render(String(value))}
                          </>
                        )}
                      </h2>
                    </div>
                  )}
                </>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}

export default React.memo(MobileViewCardForTable);
