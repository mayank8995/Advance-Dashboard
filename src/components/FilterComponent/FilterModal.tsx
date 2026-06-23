import { queryOptions, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { deepCloneCustom, transformDataForFilterModalUI } from "../../services/utils.service";
import Select from 'react-select'
import { CORRESPONDING_FILTER_TABLE_KEY_NAME } from "../../utils/constants";
import { Cross, CrossIcon, X } from "lucide-react";

export default function FilterModal({closeModal,submitFilterData}:any){

    // filetrcomp -> FilterModal
    // filter modal - send data to  react queryOptions
    // employee table access
    const queryClient = useQueryClient();
    const {data:cachedData}: any = queryClient.getQueryData(['employeesData']);
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [tabID, setTabID] = useState<any[]>();
    const [tabValue, setTabValue] = useState<any[]>();
    const [selected, setSelected] = useState<any[]>([]);



    useEffect(() =>{
        if(cachedData){
            const data = deepCloneCustom([...transformDataForFilterModalUI(cachedData)]);
            console.log("FSDFSDFDS>>>",data)
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
            // console.log("finalModified>>>",finalModified)

                setTabValue(finalModified)
            }
         
            
        }
    },[])

    useEffect(()=>{
        // const result = tabValue?.flatMap((item:any) => item[1])?.filter((it: any) => it.selected === true);
        const result = tabValue?.flatMap((item:any) => {

            return [{key:item[0], value:[...item[1]?.filter((it: any) => it.selected === true)?.map((i:any) => i?.value)]}];
        })
        console.log("IN HWERRwe",result)         
        setSelected(result || [])
    
    },[tabValue])
    


    function handleTabs(e: any){
        console.log("e>>>",e?.currentTarget?.tabIndex);
        setFocusedIndex(e.currentTarget?.tabIndex)
    }

    function submitModal(){
        console.log("selected before submission",selected)
        submitFilterData(selected)
    }

    function handleCloseModal(){
                  console.log("tabId>>>>",tabID, "tabIdArrtabIdArrtabIdArrtabId>>>",tabValue)
        closeModal()
    }

    function handleSelectedChips(e: any){
        const tab = e?.target?.id && e?.target?.id?.split("-")
        setTabValue(prev =>
             prev?.map((item:any) => item[0] === tab[0] ? [item[0], item[1]?.map((chip:any) => chip.value === tab[1] ? {...chip, selected:!chip.selected} : chip)] : item));        
    }

   

    return <>
        <div className="bg-white fixed z-300 left-0 right-0 bottom-0 rounded-t-2xl">
            <div className="flex flex-row justify-between items-center p-2 text-sm font-semibold border-b-2 border-b-slate-50"><h1>Filters</h1><X onClick={handleCloseModal} width={16} height={20}/></div>
            <div className="flex justify-between max-h-[600px] h-[350px] overflow-y-auto">
                <div className="flex flex-col justify-between">
                {tabID && tabID.map((item:any,index:number) => {
                    const filterKey = item as keyof typeof CORRESPONDING_FILTER_TABLE_KEY_NAME;
                    return (
                    <> 
                        <div  tabIndex={index} onClick={handleTabs} key={index + Math.random()} className={`cursor-pointer ${focusedIndex === index ? 'bg-white' : 'bg-slate-200'} text-xs basis-28 w-28 wrap-anywhere flex items-center justify-center ${focusedIndex === index ? 'text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-900 border-l-4 border-r-0 border-indigo-600 dark:border-indigo-400 font-semibold' : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}><h1 className="text-center">{CORRESPONDING_FILTER_TABLE_KEY_NAME[filterKey]}</h1></div>

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
                                        transition: 'all 0.2s ease',
                                        outline: 'none'
                                    }} className="bg-white p-2 relative flex-1 items-center overflow-auto overflow-x-auto   min-h-0 h-[350px]" itemID={`${index}`}>
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
            <div className="flex bg-white justify-around flex-row p-2 border-t-2 border-t-slate-50">
                <button className="">Clear All</button>
                <button onClick={submitModal} disabled={!selected.length} className={`px-6 py-2.5 font-semibold text-sm rounded-xl shadow-lg text-white ${selected.length ? 'bg-gradient-to-r from-indigo-600 to-violet-600  shadow-indigo-500/30 hover:enabled:shadow-xl hover:enabled:shadow-indigo-500/40 hover:enabled:from-indigo-700 hover:enabled:to-violet-700 transition-all duration-200 cursor-pointer' : 'bg-slate-300 disabled:text-gray-400 disabled:cursor-not-allowed'}
                    
                `}>Apply</button>
            </div>
        </div>
        <div
          className="fixed inset-0 bg-black/50 z-200"
          onClick={handleCloseModal}
        />
    </>

}