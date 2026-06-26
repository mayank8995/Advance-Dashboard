import { useQueryClient } from "@tanstack/react-query"
import React, { useEffect, useState } from "react";
import { deepCloneCustom, transformDataForFilterModalUI } from "../../services/utils.service";
import { CORRESPONDING_FILTER_TABLE_KEY_NAME } from "../../utils/constants";
import { X } from "lucide-react";

interface FilterModalComponentProps {
  closeModal: () => void;
  submitFilterData: (chipID: any) => void;
  clearAllFilter: () => void;
}

const  FilterModal: React.FC<FilterModalComponentProps> = ({closeModal,submitFilterData, clearAllFilter}:FilterModalComponentProps) => {

    const queryClient = useQueryClient();
    const {data:cachedData}: any = queryClient.getQueryData(['employeesData']);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [tabID, setTabID] = useState<any[]>();
    const [tabValue, setTabValue] = useState<any[]>();
    const [selectedChips, setSelectedChips] = useState<any[]>([]);



    useEffect(() =>{
        if(cachedData){
            const data = deepCloneCustom([...transformDataForFilterModalUI(cachedData)]);
            if(data){
                let tabIdArr:any = [];
                let finalModified:any = [];
                data?.forEach((item: any) => {
                    tabIdArr.push(item[0])
                })
                setTabID(tabIdArr);
                data?.forEach((item: any) => {
                    let tabIdValue:any = [];
                    item[1].forEach((val: any) => {
                         let obj = {"selected": false, value: val};
                        tabIdValue.push(obj);
                    })
                    finalModified.push([item[0],tabIdValue])
                })
                setTabValue(finalModified)
            }
         
            
        }
    },[])

    useEffect(()=>{
        // const result = tabValue?.flatMap((item:any) => item[1])?.filter((it: any) => it.selected === true);
        const result = tabValue?.flatMap((item:any) => {
            return [{key:item[0], value:[...item[1]?.filter((it: any) => it.selected === true)?.map((i:any) => i?.value)]}];
        })
        const chekcIfEmpty:any = result && result?.filter((res:any) => res.value.length > 0) ;
        if(chekcIfEmpty && chekcIfEmpty.length === 0) setSelectedChips([])
        else setSelectedChips(result as any[])
        
    },[tabValue])
    
    function handleTabs(e: any){
        setFocusedIndex(e.currentTarget?.tabIndex)
    }

    function submitModal(){
        submitFilterData(selectedChips)
    }
    function handleCloseModal(){
        closeModal()
    }

    function handleSelectedChips(e: any){
        const tab = e?.target?.id && e?.target?.id?.split("-")
        setTabValue(prev =>
             prev?.map((item:any) => item[0] === tab[0] ? [item[0], item[1]?.map((chip:any) => chip.value === tab[1] ? {...chip, selected:!chip.selected} : chip)] : item));        
    }

    function clearFilter(){
        setTabValue(prev =>
             prev?.map((item:any) => [item[0], item[1]?.map((chip:any) => ({...chip, selected:false}))]));        
        setSelectedChips([]);
        clearAllFilter()
    }

    return <>
        <div className="bg-white fixed z-300 left-0 right-0 bottom-0 rounded-t-2xl">
            <div className="flex flex-row justify-between items-center p-2 text-sm font-semibold border-b-2 border-b-slate-100"><h1>Filters</h1><X onClick={handleCloseModal} width={16} height={20}/></div>
            <div className="flex justify-between max-h-150 h-87.5 overflow-y-auto">
                <div className="flex flex-col justify-between">
                {tabID && tabID.map((item:any,index:number) => {
                    const filterKey = item as keyof typeof CORRESPONDING_FILTER_TABLE_KEY_NAME;
                    return (
                        <div  tabIndex={index} onClick={handleTabs} key={index + 9*index} className={`cursor-pointer text-xs basis-28 w-28 wrap-anywhere flex items-center justify-center  ${focusedIndex === index ? 'bg-white text-indigo-700 dark:text-indigo-300 dark:bg-slate-900 border-l-4 border-r-0 border-indigo-600 dark:border-indigo-400 font-semibold' : 'border-t-2 border-b-2 border-r-2 border-slate-50 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><h1 className="text-center">{CORRESPONDING_FILTER_TABLE_KEY_NAME[filterKey]}</h1></div>
                    )
                })}
                </div>
                <div className="flex-1">
                {tabValue && tabValue.map((item:any,index:number) => (
                    <div key={index + 2*index}> 
                    {focusedIndex === index && 
                        <div  className="transition-all duration-200 ease-out cursor-pointer outline-none bg-white p-2 relative flex flex-wrap flex-1 items-center overflow-auto overflow-x-auto   min-h-0 h-87.5" itemID={`${index}`}>
                            {item[1]?.map((chipObj:any, chipId: number) => (
                                <div key={chipId + 12*chipId}>
                                    {<div  id={`${item[0]}-${chipObj?.value}`} onClick={handleSelectedChips} 
                                    className={`m-1 inline-flex items-center gap-1.5 
                                                px-4 py-2 rounded-full font-medium whitespace-nowrap 
                                                border transition-all duration-150 
                                                text-xs
                                                ${ !chipObj?.selected ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/30' 
                                                : 'border-indigo-600 dark:border-indigo-400 bg-red-50 dark:bg-red-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'}`}
                                    >
                                        {typeof chipObj?.value === "boolean" ? (chipObj?.value === true ? 'Yes' : 'No') : chipObj?.value} 
                                    </div>}
                                </div>
                            ))}
                        </div>
                    }
                    </div>
                ))}
                </div>
            </div>
            <div className="flex bg-white justify-around flex-row p-2 border-t-2 border-t-slate-100">
                <button onClick={clearFilter}>Clear All</button>
                <button onClick={submitModal} disabled={!selectedChips?.length} className={`px-6 py-2.5 font-semibold text-sm rounded-xl shadow-lg text-white ${selectedChips?.length ? 'bg-linear-to-r from-indigo-600 to-violet-600  shadow-indigo-500/30 hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40 hover:enabled:from-indigo-700 hover:enabled:to-violet-700 transition-all duration-200 cursor-pointer' : 'bg-slate-300 disabled:text-gray-400 disabled:cursor-not-allowed'}
                    
                `}>Apply</button>
            </div>
        </div>
        <div
          className="fixed inset-0 bg-black/50 z-200"
          onClick={handleCloseModal}
        />
    </>

}

export default FilterModal