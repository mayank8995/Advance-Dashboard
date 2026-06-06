import { useEffect, useState } from "react";
import { getAvgEmployeeSatisfaction, getNumberofActiveProjects } from "../../utils/Utils";
import  { KEY_TRACK_METRIC, KEY_TRACK_METRIC_ICON } from "../../utils/constants";
import { Flag, MonitorCheck, Star, User } from "lucide-react";

export default function KeyMetric({newData}: any) {
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
          className="bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow"
        >
             {/* Body */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              {
                data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && <User/>}
               { data[key]?.icon === KEY_TRACK_METRIC_ICON['FLAG'] && <Flag/>}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['MONITER_CHECK'] && <MonitorCheck/>}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['STAR'] && <Star/>
              }
            </div>
          {<div>
            <p className="text-xs text-slate-400 mb-1 font-bold">{key}</p>
            <p className="text-2xl font-bold text-slate-900">{data[key]?.value}</p>
          </div>}
          </div>
          {/*  Footer */}
        </div>
      ))}

    </div>
  );
}