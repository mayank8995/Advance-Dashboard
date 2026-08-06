import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, X } from 'lucide-react';
import FormField from '../Form/FormField';
import type { ListType, TableHeader } from '../../types/types';

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
};

interface SortModalComponentProps<T extends ListType> {
  isOpen?: boolean;
  headersData: TableHeader<T>[];
  sortConfig: SortConfig;
  onSort: (value: string) => void;
  onClose: () => void;
  containerCss: string;
}

const SortModalComponent = <T extends ListType>({
  headersData,
  sortConfig,
  onSort,
  onClose,
  containerCss,
}: SortModalComponentProps<T>) => {
  const [focusedIndex, setFocusedIndex] = useState('');
  const myElementRef = useRef<HTMLButtonElement>(null);

  function handleRadio(index: string) {
    setFocusedIndex(index);
  }

  function getSortIcon(sortConfig: SortConfig, key: string) {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={20} />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={20} />
    ) : (
      <ArrowDown size={20} />
    );
  }

  function handleSort() {
    if (myElementRef?.current) {
      const id = myElementRef?.current?.id;
      if (id) {
        onSort(id);
        setTimeout(() => {
          onClose?.();
        }, 150);
      }
    }
  }

  return (
    <>
      <div className={`${containerCss}`}>
        <div className="flex flex-row justify-between items-center p-2 text-sm font-semibold border-b border-b-slate-200 dark:border-b-white/10">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Sorting
          </h2>
          <button
            type="button"
            onClick={() => onClose?.()}
            aria-label="Close sort modal"
          >
            <X
              className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer"
              width={16}
              height={20}
            />
          </button>
        </div>
        <div className="grid grid-cols-2 max-h-150 h-fit overflow-y-auto p-4 ">
          {headersData?.map((header) => (
            // <div >
            <button
              ref={myElementRef}
              key={header.key}
              id={focusedIndex}
              className={`cursor-pointer m-1 h-10 inline-flex items-center gap-1.5 
                                                px-2 py-2  font-medium whitespace-nowrap 
                                                border  
                                                text-xs
                                                outline-none
                                                ${
                                                  !(focusedIndex === header.key)
                                                    ? 'border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-white/25'
                                                    : 'bg-[#534ab7] text-white hover:bg-[#7f77dd]'
                                                }`}
              onClick={() => handleRadio(header.key)}
            >
              <FormField
                name={header.value}
                value={header.value}
                type={'radio'}
                id={header.value}
                checked={focusedIndex === header.key}
                onChange={() => handleRadio(header.key)}
                className={`m-2 outline-none ${focusedIndex === header.key ? 'w-4 h-4 accent-indigo-600' : ''}`}
              />
              <span className="truncate">{header.value}</span>
            </button>
          ))}
          <div className="p-2 flex flex-row items-center">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
              Direction:
            </span>
            <button
              onClick={handleSort}
              type="button"
              className={`ml-2 flex items-center cursor-pointer px-2 py-2 rounded-md transition-colors ${!focusedIndex ? 'text-slate-500 bg-slate-700/50' : 'bg-[#534ab7] text-white '}`}
              disabled={!focusedIndex}
            >
              {getSortIcon(sortConfig, focusedIndex)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const MemoizedSortModal = React.memo(SortModalComponent) as <
  T extends ListType,
>(
  props: SortModalComponentProps<T>
) => React.ReactElement;
export default MemoizedSortModal;
