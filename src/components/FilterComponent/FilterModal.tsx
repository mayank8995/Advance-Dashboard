import { queryOptions, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { deepCloneCustom, transformDataForFilterModalUI } from "../../services/utils.service";
import Select from 'react-select'
import { CORRESPONDING_FILTER_TABLE_KEY_NAME } from "../../utils/constants";

export default function FilterModal({closeModal}:any){

    // filetrcomp -> FilterModal
    // filter modal - send data to  react queryOptions
    // employee table access
    const queryClient = useQueryClient();
    const {data:cachedData}: any = queryClient.getQueryData(['employeesData']);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [tabID, setTabID] = useState<any[]>()
    const [tabValue, setTabValue] = useState<any[]>()


    useEffect(() =>{
        if(cachedData){
            const data = deepCloneCustom([...transformDataForFilterModalUI(cachedData)]);
            // console.log("FSDFSDFDS>>>",data)
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
            console.log("finalModified>>>",finalModified)

                setTabValue(finalModified)
            }
         
            
        }
    },[])
    


    function handleTabs(e: any){
        console.log("e>>>",e?.currentTarget?.tabIndex);
        setFocusedIndex(e.currentTarget?.tabIndex)
    }

    function submitModal(){

    }

    function handleCloseModal(){
                  console.log("tabId>>>>",tabID, "tabIdArrtabIdArrtabIdArrtabId>>>",tabValue)
        closeModal()
    }

    function handleSelectedChips(e: any){
        let tab = e?.target?.id && e?.target?.id?.split("-")
        console.log("tab>>>",tab)
        setTabValue(prev =>
             prev?.map((item:any) => item[0] === tab[0] ? [item[0], item[1]?.map((chip:any) => chip.value === tab[1] ? {...chip, selected:!chip.selected} : chip)] : item)
  );
        
        
    }

    return <>
        <div className="fixed z-300 left-0 right-0 bottom-0 bg-white max-h-[600px] h-[500px] overflow-y-auto flex justify-between">
            <div className="flex flex-col justify-between">
            {tabID && tabID.map((item:any,index:number) => {
                const filterKey = item as keyof typeof CORRESPONDING_FILTER_TABLE_KEY_NAME;
                return (
                <> 
                    <div  tabIndex={index} onClick={handleTabs} key={index + Math.random()} className={`${focusedIndex === index ? 'bg-slate-50' : 'bg-slate-200'} text-xs basis-28 w-28 wrap-anywhere flex items-center justify-center ${focusedIndex === index ? 'text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 border-l-4 border-indigo-600 dark:border-indigo-400 font-semibold' : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><h1 className="text-center">{CORRESPONDING_FILTER_TABLE_KEY_NAME[filterKey]}</h1></div>

                </>
                )
            })}
            </div>
            <div className="flex-1">
            {tabValue && tabValue.map((item:any,index:number) => (
                <> 
                {focusedIndex === index && 
                    <>
                    <div key={index + Math.random()} style={{
                                    cursor: 'pointer',
                                    borderColor: '#4F46E5',
                                    transition: 'all 0.2s ease',
                                    outline: 'none'
                                }} className="bg-slate-50 p-2 relative flex-1 items-center overflow-auto overflow-x-auto border-l-0  min-h-0 h-[500px]" itemID={`${index}`}>
                        {item[1]?.map((chipObj:any, chipId: number) => (
                            <>
                                {<div  id={`${item[0]}-${chipObj?.value}`} onClick={handleSelectedChips} key={chipId + Math.random()}
                                className={`m-1 inline-flex items-center gap-1.5 
                                            px-4 py-2 rounded-full font-medium whitespace-nowrap 
                                            border transition-all duration-150 
                                            text-xs
                                            ${ !chipObj?.selected ? 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/30' 
                                            : 'border-indigo-600 dark:border-indigo-400 bg-red-50 dark:bg-red-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'}`}
                                >
                                    {typeof chipObj?.value === "boolean" ? (chipObj?.value === true ? 'Yes' : 'No') : chipObj?.value} 
                                </div>}
                            </>
                        ))}
                    </div>
                    </>
                }
                </>
            ))}
            </div>
        </div>
        <div
          className="fixed inset-0 bg-black/50 z-200"
          onClick={handleCloseModal}
        />
    </>

}