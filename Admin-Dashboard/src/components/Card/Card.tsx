import { useEffect, useState } from "react";
import { getTopProjects } from "../../utils/Utils";
import { CARD_CONTENT_LIMIT_TO_SCROLL, gradients, PROJECT_DETAILS, RISK_STATUS, VIEW_MORE } from "../../utils/constants";
import { ArrowRight, Medal } from "lucide-react";
import { Link } from "react-router-dom";


export default function Card({topProjects, topPerformersList, promotedThisYear, meetingKPIs, requiringReview, title, cardToShow}: any) {


  const [topProj, setTopProjects] = useState(topProjects);
  const [topPerformers, setTopPerformers] = useState(topPerformersList);
  const [promoted, setPromoted] = useState(promotedThisYear);
  const [meeting, setMeeting] = useState(meetingKPIs);
  const [requiring, setRequiring] = useState(requiringReview);
      useEffect(() => {
          topProjects && setTopProjects(getTopProjects(topProjects?.employeeList?.[0]?.employees))
          topPerformersList && setTopPerformers(topPerformersList)
          promotedThisYear && setPromoted(promotedThisYear)
          meetingKPIs && setMeeting(meetingKPIs)
          requiringReview && setRequiring(requiringReview)
      },[])

  return (
    <>
        {cardToShow?.topProjects &&
        <div
        // ref={containerRef} 
         className=" bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200"
        >
          <h1 className=" mb-4 flex items-center justify-between text-lg font-bold">
              {title}
          </h1>
          <div className="overflow-y-auto min-h-0 max-h-[350px]">
          {Array.isArray(topProj) && topProj?.map((value: any, index: number) => {
           return <>
            {index < CARD_CONTENT_LIMIT_TO_SCROLL && value?.priorityRanking === "*" && <div key={index} className="">
            {RISK_STATUS.COMPLETED ===  value?.riskStatus && <div className="h-auto bg-green-700 w-2 rounded-full"></div>}
            {RISK_STATUS.AT_RISK ===  value?.riskStatus && <div className="h-auto bg-red-700 w-2 rounded-full"></div>}
            {RISK_STATUS.ON_TRACK ===  value?.riskStatus &&<div className="h-auto bg-green-500 w-2 rounded-full"></div>}
            <div className="p-2 grid grid-cols-2">
              <div className="flex flex-col ">
                <span className="text-gray-950 font-bold text-sm">
                  {value?.name}
                  </span>
                <span className="mb-1 flex items-center text-xs text-slate-500 font-bold">
                  {PROJECT_DETAILS.MANAGER}:&nbsp;{value?.manager && value?.manager}
                </span>
              </div>
              <div className="items-center flex justify-end ">
               <span className={`${RISK_STATUS.AT_RISK ===  value?.riskStatus ? "bg-orange-400 text-white font-semibold px-2 py-0.5 rounded-full text-xs" :"bg-emerald-400 text-white font-semibold px-2 py-0.5 rounded-full text-xs"}`}>
                   {value?.riskStatus}
                </span>
              </div>
            </div>
            </div>
            }
          </> 
          }
          
          )
         }
          </div>
        {Array.isArray(topProj) && topProj?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className="flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=topProjects"><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
        </div>}
         {cardToShow?.topPerformers &&<div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="flex items-center text-lg font-bold"><div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
  <span>🏆</span>
</div>{topPerformers?.title}</h1>
            <span className=" bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center">↑ {topPerformers?.trendValue}%</span>
          </div>
           <div className="overflow-y-auto min-h-0 max-h-[350px]">
          {Array.isArray(topPerformers?.employees) && topPerformers?.employees?.map((value: any, index: number) => {
           return <>
          {index < CARD_CONTENT_LIMIT_TO_SCROLL && <div className="grid  grid-cols-3 gap-6 mb-2" key={value?.id}>
             <div className="col-span-2">
              <div  className="inline-flex items-center gap-6 text-sm">
                {index >=0 && index <=2 && <Medal className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0
              ${index === 0 ? 'bg-yellow-400' :
                index === 1 ? 'bg-gray-400' :
                index === 2 ? 'bg-amber-600' : ''}`} />}
               {index > 2 && <div className={`w-8 h-8 text-center text-sm font-bold`}>
              {index + 1}
             </div>}
              <div>
                <h1 className="flex items-center text-sm font-bold">{value?.name}</h1>
                <h2 className="flex items-center text-xs text-slate-500 font-bold">{value?.designation}</h2>
              </div>
              </div>
            
              </div>
              <div className="flex gap-1 text-sm font-bold">
                  <h1>⭐</h1>
                  <h1>{value?.rating}</h1>
              </div>
          </div>}
          </>
          })}
          </div>
          { Array.isArray(topPerformers?.employees) && topPerformers?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className="flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=topPerformers"><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
         </div>}
          {cardToShow?.promotedThisYear &&<div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h1 className="flex items-center text-lg font-bold"><div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
  <span>🚀</span>
</div>{promoted?.title}</h1>
            <h2 className=" bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center">↑ {promoted?.trendValue}%</h2>
          </div>
           <div className="overflow-y-auto min-h-0 max-h-[350px]">
          {Array.isArray(promoted?.employees) && promoted?.employees?.map((value: any, index: number) => {
           return <>
          {index < CARD_CONTENT_LIMIT_TO_SCROLL && <div className="grid grid-cols-3 gap-6 mb-2" key={value?.id}>            
            <div className="col-span-2">
              <div>
              <div className="inline-flex items-center gap-3"> 
              <h1 className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center`}>
                {value.name.split(' ').map((n: any) => n[0]).join('')}
              </h1> 
              <div>
              <h1 className="flex items-center text-sm font-bold">{value?.name}</h1>
              <h1 className="flex items-center text-xs text-slate-500 font-bold">{value?.currentDesignation}</h1>
                
              </div>          
              </div>
              </div>
            </div>
              <div className="col-span-1">
                 <h2 className="flex items-center text-xs font-bold">↑ Promoted On</h2>
                 <h2 className="flex items-center text-xs font-bold"> {value?.promotedOn}</h2>
              </div>
            {/* <div>
              {value?.promotedOn}
            </div> */}
          </div>}
          </>})}
          </div>
           { Array.isArray(promoted?.employees) && promoted?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className="flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=promotedThisYear"><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
         </div>}
          {cardToShow?.meetingKPIs &&
          <div className="bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200">
          <div className="mb-4 flex flex-row items-center justify-between">
            <h1 className="flex items-center text-lg font-bold"><div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
  <span>🎯</span>
</div>
 {meeting?.title}</h1>
            <h2 className=" bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center">↑ {meeting?.trendValue}%</h2>
          </div>
          <div className="overflow-y-auto min-h-0 max-h-[350px]">
          <div className="mb-2">
            <h1 className="flex items-center text-sm font-bold">{meeting?.percentage} / 100 employees</h1>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-2">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3">
              <div className={`col-span-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center`}></div>
              <h1 className="flex items-center text-xs font-bold">Exceeding ({meeting?.breakdown?.exceeding?.ratingRange})</h1>
            </div>
            <div className={`h-10 w-full bg-gray-200`}>
            <div style={{width: `${meeting?.breakdown?.exceeding?.percentage}% ` }} className={`h-10  bg-gradient-to-r from-emerald-400 to-green-600`}></div>
            </div>
          </div>
            <div>
            <h1 className="flex items-center text-xs font-bold" >{meeting?.breakdown?.exceeding?.percentage}%</h1>
          </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-2">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3">
            <div className={`col-span-0 w-6 h-6 rounded-full bg-violet-500 text-white text-xs font-bold flex items-center justify-center`}></div>
            <h1 className="flex items-center text-xs font-bold">Meeting ({meeting?.breakdown?.meeting?.ratingRange})</h1>
            </div>
            <div className={`h-10 w-full bg-gray-200`}>
            <div style={{width: `${meeting?.breakdown?.meeting?.percentage}%`}} className={`h-10 bg-gradient-to-r from-violet-600 to-indigo-700`}></div>
            </div>
          </div>
          <div>
            <h1 className="flex items-center text-xs font-bold">{meeting?.breakdown?.meeting?.percentage}%</h1>
          </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-2">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3">
            <div className={`col-span-0 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center`}></div>
            <h1 className="flex items-center text-xs font-bold">Not Meeting ({meeting?.breakdown?.notMeeting?.ratingRange})</h1>
            </div>
            <div className={`h-10 w-full bg-gray-200`}>
            <div style={{width: `${meeting?.breakdown?.notMeeting?.percentage}%`}} className={`h-10 bg-gradient-to-r from-red-500 to-orange-500`}></div>
            </div>
          </div>
          <div>
            <h1 className="flex items-center text-xs font-bold">{meeting?.breakdown?.notMeeting?.percentage}%</h1>
          </div>
          </div>
          </div>
        </div>
         }
         {cardToShow?.requiringReview &&<div className=" bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200">
          <div className=" mb-4 flex flex-row items-center justify-between">
            <h1 className="flex items-center text-lg font-bold"><div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
  <span>⚠️</span>
</div>{requiringReview?.title}</h1>
            <h2 className="bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center">↓ {requiringReview?.trendValue}%</h2>
          </div>
          <div className="overflow-y-auto min-h-0 max-h-[350px]">
          {Array.isArray(requiring?.employees) && requiring?.employees?.map((value: any, index: number) => {
           return <>
          {index < CARD_CONTENT_LIMIT_TO_SCROLL && <div className="grid grid-cols-3 gap-6" key={index+1}>
             <div className="col-span-2">
              <div>
              <div className="inline-flex items-center gap-3"> 
              <h1 className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center`}>
                {value.name.split(' ').map((n: any) => n[0]).join('')}
              </h1> 
              <div>
              <h1 className="flex items-center text-sm font-bold">{value?.name}</h1>
              <h1 className="flex items-center text-xs text-slate-500 font-bold">{value?.designation}</h1>
                
              </div>          
              </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
          {/* {value.reviewReason.map((reason:any ,index:number) => (
            <span key={reason} className={`flex items-center text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap
              ${reason === 'Low Rating'       ? 'bg-orange-100 text-orange-600' : ''}
              ${reason === 'Low Attendance'   ? 'bg-yellow-100 text-yellow-600' : ''}
              ${reason === 'On Notice Period' ? 'bg-red-100 text-red-600'       : ''}
              ${reason === 'Low Satisfaction' ? 'bg-purple-100 text-purple-600' : ''}
            `}>
              {reason}
            </span>
          ))} */}
          <span className={`flex items-center text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap
            ${value.reviewReason[0] === 'Low Rating'       ? 'bg-orange-100 text-orange-600' : ''}
            ${value.reviewReason[0] === 'Low Attendance'   ? 'bg-yellow-100 text-yellow-600' : ''}
            ${value.reviewReason[0] === 'On Notice Period' ? 'bg-red-100 text-red-600'       : ''}
            ${value.reviewReason[0] === 'Low Satisfaction' ? 'bg-purple-100 text-purple-600' : ''}
          `}>{value.reviewReason[0]}</span>
        </div>
          <div>
          </div>
          </div>}
          </>})}
          </div>
          {  Array.isArray(requiring?.employees) && requiring?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className="flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=requiringReview"><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
         </div>}
    </>
  );
}