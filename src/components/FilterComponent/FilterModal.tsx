/* eslint-disable @eslint-react/set-state-in-effect */
import React, { useEffect, useState } from 'react';
import { CORRESPONDING_FILTER_TABLE_KEY_NAME } from '../../utils/constants';
import { X } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';
import type { SelectedChip, TableQueryParams } from '../../types/types';
import { useFilterList } from '../../services/utils.service';
import { useSearchParams } from 'react-router-dom';

type FilterListItem = [string, string[]];
interface FilterListResponse {
  data?: {
    list?: FilterListItem[];
  };
}
interface FilterModalComponentProps {
  tableType?: string;
  closeModal: () => void;
  submitFilterData: (chips: SelectedChip[]) => void;
  clearAllFilter: () => void;
  filterList?: FilterListResponse;
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
  const [tabID, setTabID] = useState<string[]>();
  const [tabValue, setTabValue] =
    useState<Array<[string, Array<{ selected: boolean; value: string }>]>>();
  const [selectedChips, setSelectedChips] = useState<SelectedChip[]>([]);

  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataList = (filterList as FilterListResponse | undefined)?.data?.list;
    if (dataList) {
      const tabIdArr: string[] = [];
      const finalModified: Array<
        [string, Array<{ selected: boolean; value: string }>]
      > = [];
      dataList.forEach(([key, values]) => {
        if (values.length) {
          tabIdArr.push(key);
        }
      });
      setTabID(tabIdArr);
      dataList.forEach(([key, values]) => {
        const tabIdValue = values.map((val) => ({
          selected: false,
          value: val,
        }));
        finalModified.push([key, tabIdValue]);
      });
      setTabValue(finalModified);
    }
  }, [filterList]);
  // console.log('tabValue>>', tabValue);

  useEffect(() => {
    const result = tabValue?.flatMap((item) => {
      return [
        {
          key: item[0],
          value: [
            ...(item?.[1]
              ?.filter((it) => it.selected === true)
              ?.map((i) => i?.value) ?? []),
          ],
        },
      ];
    });
    const checkIfEmpty =
      result && result?.filter((res) => res.value.length > 0);
    if (checkIfEmpty && checkIfEmpty.length === 0) {
      setSelectedChips([]);
    } else {
      setSelectedChips(result as SelectedChip[]);
    }
  }, [tabValue]);

  // function handleTabs(e: any) {
  //   setFocusedIndex(e.currentTarget?.tabIndex);
  // }

  function submitModal() {
    setLoading(true);
    const filters = selectedChips
      .filter((obj) => obj)
      ?.map((it) => ({ [it.key]: it?.value?.join(',') }))
      .reduce(
        (accumulator, currentItem) => ({ ...accumulator, ...currentItem }),
        {}
      );
    setTimeout(() => {
      setLoading(false);
      setQuery((prev) => ({
        ...prev,
        tableType: target || 'employees',
        // dynamicFilters: { ...prev?.dynamicFilters, ...filters },
        ...filters,
      }));
      submitFilterData(selectedChips);
    }, 300);
  }

  function handleCloseModal() {
    closeModal();
  }

  function handleSelectedChips(e: React.MouseEvent<HTMLButtonElement>) {
    if (!e?.currentTarget) {
      return;
    }
    const tab = e?.currentTarget?.id && e?.currentTarget?.id?.split('-');
    if (tab) {
      setTabValue((prev) =>
        prev?.map((item) =>
          item[0] === tab[0]
            ? [
                item[0],
                item[1]?.map((chip) =>
                  chip.value === tab[1]
                    ? { ...chip, selected: !chip.selected }
                    : chip
                ),
              ]
            : item
        )
      );
    }
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
      prev?.map((item) => [
        item[0],
        item[1]?.map((chip) => ({ ...chip, selected: false })),
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
      <div className="bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-white/10 flex flex-col max-h-[85vh] md:h-125 md:max-h-125 shadow-sm  fixed z-300 left-0 right-0 bottom-0 md:absolute md:top-[50%] md:left-[50%] md:transform md:-translate-x-1/2 md:-translate-y-1/2 rounded-t-2xl md:rounded-2xl">
        <div className="flex flex-row justify-between items-center p-4 border-b border-b-slate-200 dark:border-b-white/10">
          <h1 className="text-sm font-bold text-slate-900 dark:text-white">
            Filters
          </h1>
          <button onClick={handleCloseModal}>
            <X
              className={
                'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer'
              }
              width={16}
              height={20}
            />
          </button>
        </div>

        <div className="flex flex-1 overflow-y-auto">
          <div className="flex flex-col border-r border-r-slate-200 dark:border-r-white/10">
            {tabID &&
              tabID?.map((item, index: number) => {
                const filterKey =
                  item as keyof typeof CORRESPONDING_FILTER_TABLE_KEY_NAME;

                return (
                  <button
                    tabIndex={index}
                    onClick={(event) =>
                      setFocusedIndex(event.currentTarget?.tabIndex)
                    }
                    key={filterKey}
                    className={`h-10.5 cursor-pointer text-xs w-28 wrap-anywhere flex items-center justify-center border-slate-200 dark:border-white/10  ${
                      focusedIndex === index
                        ? 'bg-[#534ab7] text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }
                     `}
                  >
                    <h1 className="text-center">
                      {CORRESPONDING_FILTER_TABLE_KEY_NAME[filterKey]}
                    </h1>
                  </button>
                );
              })}
          </div>
          <div className="flex flex-col">
            {tabValue &&
              tabValue?.map((item, index: number) => (
                <React.Fragment key={`${item[0]}-filters`}>
                  {focusedIndex === index && (
                    <div
                      className="transition-all duration-200 ease-out outline-none  p-2 relative flex flex-wrap items-center overflow-auto overflow-x-auto   "
                      itemID={`${index}`}
                    >
                      {item[1]?.map((chipObj) => (
                        <React.Fragment
                          key={`${item[0]}-filters-${chipObj?.value}`}
                        >
                          {
                            <button
                              id={`${item[0]}-${chipObj?.value}`}
                              onClick={handleSelectedChips}
                              className={`cursor-pointer m-1 inline-flex items-center gap-1.5 
                                                px-4 py-2 rounded-full font-medium whitespace-nowrap 
                                                border transition-all duration-150 
                                                text-xs
                                                ${
                                                  !chipObj?.selected
                                                    ? 'border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/25'
                                                    : 'bg-[#534ab7] text-white hover:bg-[#7f77dd]'
                                                }`}
                            >
                              {chipObj?.value}
                            </button>
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
        <div className="flex  justify-between flex-row p-4 border-t border-t-slate-200 dark:border-t-white/10 ">
          <button
            onClick={clearFilter}
            className="text-rose-600 dark:text-rose-400 hover:underline font-semibold text-sm cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={submitModal}
            disabled={!selectedChips?.length}
            className={`px-6 py-2.5 font-semibold text-sm rounded-xl shadow-lg text-white ${selectedChips?.length ? 'bg-[#534ab7] text-white hover:bg-[#7f77dd] hover:enabled:shadow-xl transition-all duration-200 cursor-pointer' : 'bg-slate-300 text-slate-500 dark:bg-white/5 dark:text-slate-600 cursor-not-allowed'}
                    
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
      <button
        className="fixed inset-0 bg-black/40 dark:bg-black/60 z-30"
        onClick={handleCloseModal}
      />
    </>
  );
};

export default React.memo(FilterModal);
