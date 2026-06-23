import { queryOptions, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { transformDataForFilterModalUI } from "../../services/utils.service";
import Select from 'react-select'

export default function FilterModal({closeModal}:any){

    // filetrcomp -> FilterModal
    // filter modal - send data to  react queryOptions
    // employee table access
    const queryClient = useQueryClient();
    const {data:cachedData}: any = queryClient.getQueryData(['employeesData']);
    const [dataForFilterModalUI, setDataForFilterModalUI] = useState<any>()
     const [focusedIndex, setFocusedIndex] = useState(0);
    useEffect(() =>{
        if(cachedData){
            const data = [...transformDataForFilterModalUI(cachedData)];
            console.log("FSDFSDFDS>>>",data)
            setDataForFilterModalUI(data)
        }
    },[])
    


    function handleTabs(e: any){
        console.log("e>>>",e);
        setFocusedIndex(e.target.tabIndex)
    }

    function submitModal(){

    }

    function handleCloseModal(){
        closeModal()
    }

    return <>
        <div className="fixed z-300 left-0 right-0 bottom-0 bg-white max-h-[600px] h-[500px] overflow-y-auto flex justify-between">
            <div className="flex flex-col justify-between">
            {dataForFilterModalUI && dataForFilterModalUI.map((item:any,index:number) => (
                <> 
                <div  key={index + Math.random()}>
                    <div className={`overflow-y-scroll`}>
                    <div className="bg-slate-200 basis-28 wrap-anywhere"><h1 className="" tabIndex={index} onClick={handleTabs}>{item[0]}</h1></div>
                    </div>
                </div>
               {/* <Select options={options} /> */}
                </>
            ))}
            </div>
            <div className="flex-1">
            {dataForFilterModalUI && dataForFilterModalUI.map((item:any,index:number) => (
                <> 
                {focusedIndex === index && <div  key={index + Math.random()}>
                    <div className={`overflow-y-scroll`}>
                    {/* <div className="bg-slate-200 basis-28 wrap-anywhere"><h1 className="" tabIndex={index} onClick={handleTabs}>{item[0]}</h1></div> */}
                    <div style={{
                                    padding: '12px 24px',
                                    cursor: 'pointer',
                                    border: '2px solid',
                                    // Dynamically change style properties based on active tab state
                                    borderColor: focusedIndex === index ? '#4F46E5' : '#E5E7EB',
                                    backgroundColor: focusedIndex === index ? '#EEF2F6' : '#FFFFFF',
                                    transition: 'all 0.2s ease',
                                    outline: 'none'
                                }} className="flex-1 items-center overflow-auto border-2 min-h-0 h-[500px]" itemID={`${index}`}>
                        {item[1]?.map((value:any, index: number) => (
                            <>
                                <div key={index + Math.random()}>
                                    {value}
                                </div>
                            </>
                        ))}
                    </div>
                    </div>
                </div>}
               {/* <Select options={options} /> */}
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