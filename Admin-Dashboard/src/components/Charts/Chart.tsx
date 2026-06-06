import { useEffect, useState } from "react";
import { getTopProjects } from "../../utils/Utils";
import { PROJECT_DETAILS, RISK_STATUS } from "../../utils/constants";


export default function Chart({newData, title}: any) {

  const [data, setData] = useState({} as any);
      useEffect(() => {
        if(newData){
          setData(newData?.employeeList?.[0]?.employees)
        }
      },[])

  return (
    <>
    <div className="flex-[0] min-w-0">
        <div
          className="col-span-2 bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between text-2xl font-bold">
              {title}
          </div>

          {Array.isArray(data) && data?.map((value: any, index: number) => {
           return <>
            {getTopProjects(value?.projects)?.priorityRanking < 6 && <div key={index} className="inline-flex">
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
              <div className="text-gray-400 font-bold">
                {PROJECT_DETAILS.MANAGER}:&nbsp;{value?.manager && value?.manager}
              </div>
            </div>
            </div>}
          </> 
          }
          
          )
         }

        </div>
    </div>
    </>
  );
}