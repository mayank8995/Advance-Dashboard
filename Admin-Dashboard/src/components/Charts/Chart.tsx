import { useEffect, useState } from "react";
import { getTopProjects } from "../../utils/Utils";
import { PROJECT_DETAILS, RISK_STATUS } from "../../utils/constants";
import { Legend, LineChart, Tooltip } from "recharts";
import { CartesianGrid, Line, XAxis, YAxis } from "recharts";
import { RechartsDevtools } from '@recharts/devtools';

export default function Chart({newData, title, graph, graphData}: any) {

  const [data, setData] = useState({} as any);
      useEffect(() => {
        console.log("DFEWREWE>>>",graphData?.trend)
        if(newData && !graph){
          setData(newData?.employeeList?.[0]?.employees)
        }
      },[])

  return (
    <>
     {!graph &&<div className="flex-[0] min-w-0">
        <div
          className="col-span-2 bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow"
        >

          {/* Card Header */}
          <div className="flex items-center justify-between text-2xl font-bold">
            {/* <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <i className="ti ti-chart-bar text-blue-500 text-xl" />
            </div> */}
              {title}
          </div>

          {/* Card Body */}
          {/* <div>
            <p className="text-xs text-slate-400 mb-1">Total Employees</p>
            <p className="text-2xl font-bold text-slate-900">15,230</p>
          </div> */}
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

          {/* Card Footer */}
          {/* <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-xs text-slate-400">Updated just now</span>
            <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
              View →
            </button>
          </div> */}

        </div>
    </div>}
    {graph &&
    <div className="flex-[0] min-w-0">
      <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-2 flex flex-col gap-3 hover:shadow-md transition-shadow">
     <div className="flex items-center justify-between text-2xl font-bold">
              {title}
      </div>
     <LineChart  key={4364578686} style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} responsive data={graphData?.trend}>
      <CartesianGrid stroke="#8884d8" strokeDasharray="5 5" />
      <XAxis  dataKey="month"    stroke="#8884d8" />
      <YAxis  dataKey="rate" width="auto"    stroke="#8884d8"  />
      <Line
        type="monotone"
        dataKey="rate"
           stroke="#8884d8" 
        dot={{
          fill: '#8884d8',
        }}
        activeDot={{
          stroke: '#8884d8',
        }}
      />
<Legend align="right" />
      <Tooltip />
      <RechartsDevtools />
    </LineChart>
      </div>
    </div>
    }
    </>
  );
}