import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown, X } from 'lucide-react';
import { TailSpin } from 'react-loader-spinner';

type SortConfig = {
  key: string;
  direction: string;
};


interface SortModalComponentProps {
  isOpen?: boolean;
  headersData: any;
  sortConfig: SortConfig
  onSort: (value: string) => void;
  closeSortModal: () => void;
}


const SortModalComponent: React.FC<SortModalComponentProps> = ({
  headersData,
  sortConfig,
  onSort,
  closeSortModal,
}) => {

    const [focusedIndex, setFocusedIndex] = useState("")

    const myElementRef: any = useRef(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      
    },[])
    
        function handleRadio(index: string){
            console.log("index>>>>",index)
            setFocusedIndex(index)
        }

        function getSortIcon(sortConfig:SortConfig, key: string){
          if(sortConfig.key !== key) return <ArrowUpDown size={20} />
          return sortConfig.direction === 'asc' ? <ArrowUp size={20} /> : <ArrowDown size={20}/>
        }

        function handleSort(){
          if (myElementRef?.current) {
              setLoading(true)
              setTimeout(() => {
                setLoading(false)
                onSort && onSort(myElementRef?.current?.id)
              },500)
          }
        }


  return (
    <>
        <div className="bg-linear-to-br from-white to-indigo-100 shadow-sm border border-slate-100 dark:bg-linear-to-br dark:from-slate-950 dark:to-slate-950  dark:border-slate-800 fixed z-300 left-0 right-0 bottom-0 rounded-t-2xl">
          <div className="flex flex-row justify-between items-center p-2 text-sm font-semibold border-b-2 border-b-slate-400/50 dark:border-b-2 dark:border-b-white/10"><h2 className='dark:text-slate-200'>Sorting</h2>
          <button type="button" onClick={() => closeSortModal?.()} aria-label="Close sort modal">
            <X className='text-slate-950 cursor-pointer dark:text-slate-200' width={16} height={20}/>
          </button></div>
            <div className="grid grid-cols-2 max-h-150 h-fit overflow-y-auto p-4 "> 
          {headersData?.map((header: any, index: number) => 
            // <div >                             
                        <div ref={myElementRef}  key={index + 21*index} id={focusedIndex}
                        className={`m-1 h-10 inline-flex items-center gap-1.5 
                                                px-2 py-2 rounded-b-xl font-medium whitespace-nowrap 
                                                border  
                                                text-xs
                                                outline-none
                                                ${ !(focusedIndex === header.key)? 'border-slate-400 dark:border-slate-600 bg-white dark:bg-indigo-950/30 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/30' 
                                                : 'border-indigo-600 dark:border-indigo-400 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 font-semibold'}`}
                       onClick={() => handleRadio(header.key)}
                        >
                            <input
                                    type="radio"
                                    name={header.value}
                                    value={header.value}
                                    checked={focusedIndex === header.key}
                                    onChange={() => handleRadio(header.key)}
                                    className={`m-2 outline-none ${focusedIndex === header.key ? 'w-4 h-4 accent-indigo-600': ''}`}
                                />
                                {header.value}
                        </div>
          )}
            <div className='p-2 flex flex-row items-center'>
              <label className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase'>Direction:</label>
                <button onClick={handleSort} type="button" className={`ml-2 flex items-center cursor-pointer px-2 py-2 rounded-md transition-colors ${!focusedIndex ? 'text-slate-500 bg-slate-700/50' : 'bg-[#534ab7] text-white '}`} 
                
                disabled={!focusedIndex}
                >
                {!loading && getSortIcon(sortConfig,focusedIndex)}
                {loading && <TailSpin
                                        visible={true}
                                        height={20}
                                        width={20}
                                        color="#ffff"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass="flex items-center justify-center"
                                        /> }
                </button>
            </div>
            </div>
    </div>
     <div
          className="fixed inset-0 bg-black/50 z-200"
           onClick={() => closeSortModal?.()}
        />
    </>
  );
};

export default SortModalComponent;
