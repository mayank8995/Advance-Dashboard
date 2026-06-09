import { useEffect, useState } from "react";
import { getTopProjects } from "../../utils/Utils";
import { PROJECT_DETAILS, RISK_STATUS } from "../../utils/constants";
import { useElementSize } from "../../hooks/useElementSize";


export default function Card({newData, title}: any) {

  // const [containerRef, { width, breakpoint }] = useElementSize<HTMLDivElement>();

  // const isCompact = breakpoint === 'sm';
  // const isWide = breakpoint === 'lg' || breakpoint === 'xl';

  const [data, setData] = useState({} as any);
      useEffect(() => {
        if(newData){
          setData(newData?.employeeList?.[0]?.employees)
        }
      },[])

  return (
    <>
        <div
        // ref={containerRef} 
          className="col-span-2 border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg bg-white
  shadow-sm
  transition-all
  duration-300  h-full"
        >
          <div className="flex items-center justify-between text-2xl font-bold">
              {title}
          </div>

          {Array.isArray(data) && data?.map((value: any, index: number) => {
           return <>
            {getTopProjects(value?.projects)?.priorityRanking === "*" && <div key={index} className="inline-flex">
            {RISK_STATUS.COMPLETED ===  getTopProjects(value?.projects)?.riskStatus && <div className="h-auto bg-green-700 w-2 rounded-full"></div>}
            {RISK_STATUS.AT_RISK ===  getTopProjects(value?.projects)?.riskStatus && <div className="h-auto bg-red-700 w-2 rounded-full"></div>}
            {RISK_STATUS.ON_TRACK ===  getTopProjects(value?.projects)?.riskStatus &&<div className="h-auto bg-green-500 w-2 rounded-full"></div>}
            <div className="p-2">
              <div>
                <span className="font-bold">
                  {getTopProjects(value?.projects)?.name}
                  </span>&nbsp;
                <span className="text-green-500 font-bold">
                  - {getTopProjects(value?.projects)?.riskStatus}
                </span>
              </div>
              <div className="mb-1 text-sm text-slate-500 font-medium">
                {PROJECT_DETAILS.MANAGER}:&nbsp;{value?.manager && value?.manager}
              </div>
            </div>
            </div>}
          </> 
          }
          
          )
         }

        </div>

    </>
  );
}