import React, { useEffect, useState } from 'react';
import { CORRESPONDING_FILTER_TABLE_KEY_NAME } from '../../utils/constants';
import { X } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';
import type { TableQueryParams } from '../../types/types';
import { useFilterList } from '../../services/utils.service';
import { useSearchParams } from 'react-router-dom';

interface FilterModalComponentProps {
  tableType?: string;
  closeModal: () => void;
  submitFilterData: (chipID: any) => void;
  clearAllFilter: () => void;
  filterList?: any;
  tableQueryParams?: TableQueryParams;
  setQuery: React.Dispatch<React.SetStateAction<TableQueryParams>>;
}

const FilterModal: React.FC<FilterModalComponentProps> = ({
  closeModal,
  submitFilterData,
  clearAllFilter,
  setQuery,
}: FilterModalComponentProps) => {
  const [searchParams] = useSearchParams();
  const target = searchParams?.get('target');
  const { data: filterList } = useFilterList({
    tableType: target || 'employees',
  });
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [tabID, setTabID] = useState<any[]>();
  const [tabValue, setTabValue] = useState<any[]>();
  const [selectedChips, setSelectedChips] = useState<any[]>([]);

  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filterList) {
      const data: any = filterList['data']?.list;
      let tabIdArr: any = [];
      let finalModified: any = [];
      data?.forEach((item: any) => {
        item[1].length && tabIdArr.push(item[0]);
      });
      setTabID(tabIdArr);
      data?.forEach((item: any) => {
        let tabIdValue: any = [];
        item[1].forEach((val: any) => {
          let obj = { selected: false, value: val };
          tabIdValue.push(obj);
        });
        finalModified.push([item[0], tabIdValue]);
      });
      setTabValue(finalModified);
    }
  }, [filterList]);
  // console.log('tabValue>>', tabValue);
  useEffect(() => {
    const result = tabValue?.flatMap((item: any) => {
      return [
        {
          key: item[0],
          value: [
            ...item[1]
              ?.filter((it: any) => it.selected === true)
              ?.map((i: any) => i?.value),
          ],
        },
      ];
    });
    const checkIfEmpty: any =
      result && result?.filter((res: any) => res.value.length > 0);
    console.log('checkIfEmpty>>', checkIfEmpty);
    if (checkIfEmpty && checkIfEmpty.length === 0) setSelectedChips([]);
    else setSelectedChips(result as any[]);
  }, [tabValue]);

  function handleTabs(e: any) {
    setFocusedIndex(e.currentTarget?.tabIndex);
  }

  function submitModal() {
    setLoading(true);
    const filters = selectedChips
      .filter((obj: any) => obj)
      .map((it) => ({ [it.key]: it?.value?.join(',') }))
      .reduce(
        (accumulator, currentItem) => ({ ...accumulator, ...currentItem }),
        {} as Record<string, any>
      );
    setTimeout(() => {
      setLoading(false);
      setQuery((prev) => ({
        ...prev,
        tableType: target || 'employees',
        ...filters,
      }));
      submitFilterData(selectedChips);
    }, 500);
  }

  function handleCloseModal() {
    closeModal();
  }

  function handleSelectedChips(e: any) {
    const tab = e?.target?.id && e?.target?.id?.split('-');
    setTabValue((prev) =>
      prev?.map((item: any) =>
        item[0] === tab[0]
          ? [
              item[0],
              item[1]?.map((chip: any) =>
                chip.value === tab[1]
                  ? { ...chip, selected: !chip.selected }
                  : chip
              ),
            ]
          : item
      )
    );
  }

  function clearFilter() {
    setQuery((prev) => ({
      page: prev.page,
      limit: prev.limit,
      search: prev.search,
      sortBy: prev.sortBy,
      order: prev.order,
      tableType: prev.tableType,
    }));
    setTabValue((prev) =>
      prev?.map((item: any) => [
        item[0],
        item[1]?.map((chip: any) => ({ ...chip, selected: false })),
      ])
    );
    setSelectedChips([]);
    clearAllFilter();
  }

  function handleSeeMore() {
    setSeeMore(false);
  }

  return (
    <>
      <div className="flex flex-col max-h-[85vh] md:max-h-150 bg-linear-to-br from-white to-indigo-100 shadow-sm border border-slate-100 dark:bg-linear-to-br dark:from-slate-950 dark:to-indigo-950 dark:border-slate-900/50 fixed z-300 left-0 right-0 bottom-0 md:absolute md:top-[50%] md:left-[50%] md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-t-2xl md:rounded-2xl">
        <div className="flex flex-row justify-between items-center p-2 text-sm font-bold border-b-2 border-b-slate-400/50 dark:text-slate-200/50">
          <h1 className="dark:text-slate-200">Filters</h1>
          <X
            className={'text-slate-950 cursor-pointer dark:text-slate-200'}
            onClick={handleCloseModal}
            width={16}
            height={20}
          />
        </div>

        <div className="flex flex-1 min-h-0 overflow-y-auto">
          <div className="flex flex-col">
            {tabID &&
              tabID.map((item: any, index: number) => {
                const filterKey =
                  item as keyof typeof CORRESPONDING_FILTER_TABLE_KEY_NAME;

                return (
                  <div
                    tabIndex={index}
                    onClick={handleTabs}
                    key={index + filterKey}
                    className={`flex-1 min-h-0  cursor-pointer text-xs basis-28 w-28 wrap-anywhere flex items-center justify-center  ${focusedIndex === index ? ' text-indigo-700  border-l-4 border-r-0 border-indigo-600 dark:text-indigo-300 dark:border-indigo-400/50 font-semibold' : 'border-r-2 border-slate-400/50 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'} ${index === 0 ? 'border-t-0' : focusedIndex === index ? 'border-t-2 border-t-slate-400 ' : 'border-t-2 '}`}
                  >
                    <h1 className="text-center">
                      {CORRESPONDING_FILTER_TABLE_KEY_NAME[filterKey]}
                    </h1>
                  </div>
                );
              })}
          </div>
          <div className="flex flex-col">
            {tabValue &&
              tabValue.map((item: any, index: number) => (
                <React.Fragment key={index + item[1]}>
                  {focusedIndex === index && (
                    <div
                      className="flex-1 min-h-0 transition-all duration-200 ease-out outline-none  p-2 relative flex flex-wrap items-center overflow-auto overflow-x-auto   "
                      itemID={`${index}`}
                    >
                      {item[1]?.map((chipObj: any, chipId: number) => (
                        <React.Fragment key={`${chipId}-${chipObj?.value}`}>
                          {
                            <div
                              id={`${item[0]}-${chipObj?.value}`}
                              onClick={handleSelectedChips}
                              className={`cursor-pointer m-1 inline-flex items-center gap-1.5 
                                                px-4 py-2 rounded-full font-medium whitespace-nowrap 
                                                border transition-all duration-150 
                                                text-xs
                                                ${
                                                  !chipObj?.selected
                                                    ? 'bg-indigo-100 border-slate-300 dark:border-slate-600  dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
                                                    : 'border-indigo-600 dark:border-indigo-400 bg-red-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                                                }`}
                            >
                              {chipObj?.value}
                            </div>
                          }
                        </React.Fragment>
                      ))}
                      {seeMore && (
                        <button onClick={handleSeeMore}>See More</button>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </div>
        <div className="flex  justify-around flex-row p-2 border-t-2 border-t-slate-400/50 ">
          <button
            onClick={clearFilter}
            className="text-indigo-600 font-semibold text-sm cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={submitModal}
            disabled={!selectedChips?.length}
            className={`px-6 py-2.5 font-semibold text-sm rounded-xl shadow-lg text-white ${selectedChips?.length ? 'bg-linear-to-r from-indigo-600 to-violet-600  shadow-indigo-500/30 hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40 hover:enabled:from-indigo-700 hover:enabled:to-violet-700 transition-all duration-200 cursor-pointer' : 'bg-slate-300 disabled:text-gray-500 disabled:cursor-not-allowed'}
                    
                `}
          >
            {loading ? (
              <TailSpin
                visible={true}
                height={20}
                width={20}
                color="#ffff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass="flex items-center justify-center"
              />
            ) : (
              'Apply'
            )}
          </button>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black/50 z-200"
        onClick={handleCloseModal}
      />
    </>
  );
};

export default React.memo(FilterModal);
