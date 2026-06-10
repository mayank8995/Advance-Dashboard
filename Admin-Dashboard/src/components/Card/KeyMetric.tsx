import { useEffect, useState } from "react";
import { getAvgEmployeeSatisfaction, getNumberofActiveProjects } from "../../utils/Utils";
import  { KEY_TRACK_METRIC, KEY_TRACK_METRIC_ICON } from "../../utils/constants";
import { Flag, MonitorCheck, Star, User } from "lucide-react";

export default function KeyMetric({newData}: any) {
  console.log("key metric data", newData  )
    const [data, setData] = useState({} as any);
    useEffect(() => {
      if(newData){
        const obj: any = {
            [KEY_TRACK_METRIC['TOTAL_EMPLOYEES']]: {value:newData?.employeeList?.[0]?.totalEmployeeCount, icon: KEY_TRACK_METRIC_ICON['USER']},
            [KEY_TRACK_METRIC['NOTICE_PERIOD_EMP']]: {value:newData?.employeeList?.[0]?.totalNoticePeriodEmployeeCount, icon: KEY_TRACK_METRIC_ICON['FLAG']},
            [KEY_TRACK_METRIC['AVG_EMP_SAT']]: {value:`${getAvgEmployeeSatisfaction(newData?.employeeList?.[0]?.employees)} / 5`, icon: KEY_TRACK_METRIC_ICON['STAR']},
            [KEY_TRACK_METRIC['ACTV_PROJ']]: {value:getNumberofActiveProjects(newData?.employeeList?.[0]?.employees), icon: KEY_TRACK_METRIC_ICON['MONITER_CHECK']} 
        };
        setData(obj);
      }
    },[])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">

      {/* Card */}
      {data && Object?.keys(data).map((key,i) =>(
        <div
          key={i}
          className={`bg-gradient-to-br from-white to-indigo-50/40 border border-slate-200 rounded-xl flex flex-col gap-3 pt-2 pl-2 pr-2 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200
            ${data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && 'border-t-4 border-t-blue-500'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['FLAG'] && 'border-t-4 border-t-orange-500'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['MONITER_CHECK'] && 'border-t-4 border-t-purple-500'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['STAR'] && 'border-t-4 border-t-green-500'}
            `}>

             {/* Body */}
          <div className="grid grid-cols-2 gap-6 items-center" >
            <div className={`h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && 'border-t-4 border-t-blue-500'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['FLAG'] && 'border-t-4 border-t-orange-500'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['MONITER_CHECK'] && 'border-t-4 border-t-purple-500'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['STAR'] && 'border-t-4 border-t-green-500'}`}>
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && <User className="h-6 w-6 text-blue-600"/>}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['FLAG'] && <Flag className="h-6 w-6 text-orange-600"/>}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['MONITER_CHECK'] && <MonitorCheck className="h-6 w-6 text-purple-600"/>}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['STAR'] && <Star className="h-6 w-6 text-green-600"/>
              }
            </div>
          {<div className="col-span-1">
            <h1 className="mb-1 text-sm text-slate-500 font-medium ">{key}</h1>
            <h2 className="text-xl font-bold text-indigo-600 drop-shadow-sm">{data[key]?.value}</h2>
          </div>}
          </div>
          {/*  Footer */}
        </div>
      ))}

    </div>
  );
}