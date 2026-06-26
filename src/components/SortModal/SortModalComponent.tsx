import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import FormField from '../Form/FormField';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

type SortOption = {
  id: string;
  label: string;
  value: string;
};

interface SortModalComponentProps {
  isOpen?: boolean;
  selectedOption?: string;
  options?: SortOption[];
  columnsData?: any;
  headersData?: any;
  onSort?: (value: string) => void;
  onGetSortIcon?: (value: string) => void;
  closeSortModal?: () => void;
  onSelect?: (value: string) => void;
}

/*
Sort By:
( ) Date
(•) Price
( ) Rating

Direction:
[ Low to High ]  [• High to Low •] */

const SortModalComponent: React.FC<SortModalComponentProps> = ({
  isOpen,
  selectedOption,
  columnsData,
  headersData,
  options,
  onSort,
  onGetSortIcon,
  closeSortModal,
  onSelect,
}) => {
  if (!isOpen) {
    return null;
  }
    const [focusedIndex, setFocusedIndex] = useState(-1)
    // useEffect(() => {
    //     console.log("focusedIndex>>>",focusedIndex)
    // },[focusedIndex])
        const myElementRef: any = useRef(null);
    
        function handleRadio(e:any,index: number){
          e.preventDefault();
    e.stopPropagation();
            console.log("index>>>>",index)
            setFocusedIndex(index)
        }

        function handleSort(){
          if (myElementRef?.current) {
              console.log(myElementRef?.current)
              const targetEl = myElementRef.current.querySelector('id');
      console.log(targetEl);
          }
        }

  return (
    <>
        <div className="bg-white fixed z-300 left-0 right-0 bottom-0 rounded-t-2xl">
          <div className="flex flex-row justify-between items-center p-2 text-sm font-semibold border-b-2 border-b-slate-200"><h2>Sorting</h2>
          <button type="button" onClick={() => closeSortModal?.()} aria-label="Close sort modal">
            ×
          </button></div>
            <div className="grid grid-cols-2 max-h-[600px] h-fit overflow-y-auto p-4 "> 
          {headersData?.map((header: any, index: number) => 
            // <div >                             
                        <div ref={myElementRef}  key={index + 21*index} data-key={header.key}
                        className={`m-1 h-10 inline-flex items-center gap-1.5 
                                                px-2 py-2 rounded-b-xl font-medium whitespace-nowrap 
                                                border  
                                                text-xs
                                                outline-none
                                                ${ !(focusedIndex === index)? 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/30' 
                                                : 'border-indigo-600 dark:border-indigo-400 bg-red-50 dark:bg-red-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'}`}
                        onClick={() => console.log("got clicked also!!")}
                        >
                            <input
                                    type="radio"
                                    name={header.value}
                                    value={header.value}
                                    checked={focusedIndex === index}
                                    onChange={(e) => handleRadio(e,index)}
                                    className={`m-2 outline-none ${focusedIndex === index ? 'w-4 h-4 accent-indigo-600': ''}`}
                                />
                                {header.value}
                        </div>
          )}
            <div className='flex flex-row items-center justify-around'>
              <label className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase'>Direction:</label>
              <div className='flex flex-row items-center cursor-pointer' onClick={handleSort}>
                <ArrowUpAZ size={30} className='pr-2 text-slate-800' /><span className='text-sm font-semibold uppercase text-slate-800'>or</span><ArrowDownAZ size={30} className='pl-2 text-slate-800 text-sm font-semibold' />
              </div>
            </div>
            </div>
    </div>
     <div
          className="fixed inset-0 bg-black/50 z-200"
        />
    </>
  );
};

export default SortModalComponent;
