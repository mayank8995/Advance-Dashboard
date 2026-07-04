import { useEffect, useState } from "react";
import { getTopProjects } from "../../services/utils.service";
import { bgColors, CARD_CONTENT_LIMIT_TO_SCROLL, gradients, PROJECT_DETAILS, RISK_STATUS, VIEW_MORE, VIEW_MORE_ROUTES_VALUES } from "../../utils/constants";
import { ArrowRight, Briefcase, Medal, Star, Target, TriangleAlert, Trophy, UserStar } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";


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
          // console.log("topProj>>>>",topProj);
      },[])

  return (
    <React.Fragment>
      
        {cardToShow?.topProjects &&
        <div
        // ref={containerRef} 
         className="h-full bg-linear-to-br from-white to-indigo-50/40 rounded-xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center justify-center">
              <div className="mr-2 w-8 h-8 rounded-lg flex items-center justify-center">{<Briefcase className="text-amber-500 dark:text-amber-100" />}</div>
            <h1 className=" flex items-center text-lg font-bold dark:text-slate-100">{title}</h1>
          </div>
          </div>
          <div className="flex-1 flex flex-col justify-evenly">
          {Array.isArray(topProj) && topProj?.map((value: any, index: number) => {
           return <>
            {index < CARD_CONTENT_LIMIT_TO_SCROLL && value?.priorityRanking === "*" && <div key={index} className="flex flex-row mb-2">
            {RISK_STATUS.COMPLETED ===  value?.riskStatus && <div className="h-auto bg-green-700 w-2 rounded-full "></div>}
            {RISK_STATUS.AT_RISK ===  value?.riskStatus && <div className="h-auto bg-red-700 w-2 rounded-full"></div>}
            {RISK_STATUS.ON_TRACK ===  value?.riskStatus &&<div className="h-auto bg-green-500 w-2 rounded-full"></div>}
            <div className="p-2 flex flex-row justify-between w-full">
              <div className="flex flex-col">
                <span className="text-gray-950 font-bold text-sm dark:text-slate-100">
                  {value?.projectName}
                  </span>
                <span className="mb-1 flex items-center text-xs text-slate-500 font-bold dark:text-slate-300">
                  {PROJECT_DETAILS.MANAGER}:&nbsp;{value?.name && value?.name.length > 20 ? value.name.split(' ').map((n: any) => n[0]).join('') : value.name}
                </span>
              </div>
              <div className="items-center flex justify-end">
               <span className={`whitespace-nowrap ${RISK_STATUS.AT_RISK ===  value?.riskStatus ? "bg-orange-400 text-white font-semibold px-2 py-0.5 rounded-full text-xs dark:bg-emerald-900/40 dark:text-orange-400" :"bg-emerald-400 text-white font-semibold px-2 py-0.5 rounded-full text-xs dark:bg-emerald-900/40 dark:text-emerald-400"}`}>
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
        {Array.isArray(topProj) && topProj?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className=" bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=topProjects" state={{name:VIEW_MORE_ROUTES_VALUES.top_projects}}><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
        </div>
        }
         {cardToShow?.topPerformers &&<div className=" h-full bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-yellow-950/20 dark:border-none">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center justify-center">
            <div className="mr-2 w-8 h-8 rounded-lg flex items-center justify-center"> <UserStar className="text-amber-500 dark:text-amber-100"/></div>
            <h1 className=" flex items-center text-lg font-bold dark:text-slate-100">{topPerformers?.title}</h1>
          </div>
            <span className="whitespace-nowrap bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-emerald-400">↑ {topPerformers?.trendValue}%</span>
          </div>
           <div className="flex-1 flex flex-col justify-evenly">
          {Array.isArray(topPerformers?.employees) && topPerformers?.employees?.map((value: any, index: number) => {
           return <>
          {index < CARD_CONTENT_LIMIT_TO_SCROLL && <div className="flex items-center justify-between mb-2" key={value?.id}>
              <div  className="inline-flex items-center gap-6 text-sm">
                {index >=0 && index <=2 && <Medal className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
              ${index === 0 ? 'text-yellow-400' :
                index === 1 ? 'text-gray-400' :
                index === 2 ? 'text-amber-600' : ''}`} />}
               {index > 2 && <div className={`w-8 h-8 text-center text-sm font-bold dark:text-slate-100`}>
              {index + 1}
             </div>}
              <div>
                <h1 className="flex items-center text-sm font-bold dark:text-slate-100">{value?.name}</h1>
                <h2 className="flex items-center text-xs text-slate-500 font-bold dark:text-slate-300">{value?.designation}</h2>
              </div>
              </div>
              <div className="flex gap-1 text-sm font-bold items-center">
                  <Star size={14} className="text-amber-200" fill="#FFEA00"/>
                  <h1 className="dark:text-slate-100">{value?.rating}</h1>
              </div>
          </div>}
          </>
          })}
          </div>
          { Array.isArray(topPerformers?.employees) && topPerformers?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className=" bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=topPerformers" state={{name:VIEW_MORE_ROUTES_VALUES.top_performers}}><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
         </div>}
          {cardToShow?.promotedThisYear &&<div className=" h-full bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 darK:bg-gradient-to-br dark:from-slate-900 dark:to-green-950/20 dark:border-none">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center justify-center">
              <div className="mr-2 w-8 h-8 rounded-lg  flex items-center justify-center"><Trophy className="text-amber-500 dark:text-amber-100"/></div>
            <h1 className=" flex items-center text-lg font-bold dark:text-slate-100">{promoted?.title}</h1>
          </div>
            <h2 className="whitespace-nowrap bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-emerald-400">↑ {promoted?.trendValue}%</h2>
          </div>
           <div className="flex-1 flex flex-col justify-evenly">
          {Array.isArray(promoted?.employees) && promoted?.employees?.map((value: any, index: number) => {
           return <>
          {index < CARD_CONTENT_LIMIT_TO_SCROLL && <div className="flex flex-row justify-between mb-2" key={value?.id}>            
              <div>
              <div className="inline-flex items-center gap-3"> 
              <h1 className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center dark:bg-none dark:${bgColors[index % bgColors.length]}`}>
                {value.name.split(' ').map((n: any) => n[0]).join('')}
              </h1> 
              <div>
              <h1 className="flex items-center text-sm font-bold dark:text-slate-100">{value?.name}</h1>
              <h1 className="flex items-center text-xs text-slate-500 font-bold dark:text-slate-300">{value?.currentDesignation}</h1>
                
              </div>          
              </div>
              </div>
              <div>
                 <h2 className="flex items-center text-xs font-bold dark:text-slate-100">↑ Promoted On</h2>
                 <h2 className="flex items-center text-xs font-bold dark:text-slate-100"> {value?.promotedOn}</h2>
              </div>
            {/* <div>
              {value?.promotedOn}
            </div> */}
          </div>}
          </>})}
          </div>
           { Array.isArray(promoted?.employees) && promoted?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className=" bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=promotedThisYear" state={{name:VIEW_MORE_ROUTES_VALUES.promotedThisYear}}><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
         </div>}
          {cardToShow?.meetingKPIs &&
          <div className=" h-full  bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-indigo-950/20 dark:border-none">
          <div className="mb-4 flex flex-row items-center justify-between">
            <div className="flex items-center justify-center">
              <div className="mr-2 w-8 h-8 rounded-lg  flex items-center justify-center"><Target  className="text-amber-500 dark:text-amber-100"/></div>
            <h1 className=" flex items-center text-lg font-bold dark:text-slate-100">{meeting?.title}</h1>
          </div>
            <h2 className="whitespace-nowrap bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-emerald-400">↑ {meeting?.trendValue}%</h2>
          </div>
          <div className="flex-1 flex flex-col justify-evenly">
          <div className="mb-2">
            <h1 className="flex items-center text-sm font-bold dark:text-slate-100">{meeting?.percentage} / 100 employees</h1>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className={`col-span-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center`}></div>
              <h1 className="flex items-center text-xs font-bold dark:text-slate-100">Exceeding ({meeting?.breakdown?.exceeding?.ratingRange})</h1>
            </div>
            <div className={`h-6 w-full bg-gray-200`}>
            <div style={{width: `${meeting?.breakdown?.exceeding?.percentage}% ` }} className={`h-6  bg-linear-to-r from-emerald-400 to-green-600 dark:bg-linear-to-r `}></div>
            </div>
          </div>
            <div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100" >{meeting?.breakdown?.exceeding?.percentage}%</h1>
          </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3 mb-2">
            <div className={`col-span-0 w-6 h-6 rounded-full bg-violet-500 text-white text-xs font-bold flex items-center justify-center`}></div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100">Meeting ({meeting?.breakdown?.meeting?.ratingRange})</h1>
            </div>
            <div className={`h-6 w-full bg-gray-200`}>
            <div style={{width: `${meeting?.breakdown?.meeting?.percentage}%`}} className={`h-6 bg-linear-to-r  dark:bg-linear-to-r from-violet-600 to-indigo-700`}></div>
            </div>
          </div>
          <div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100">{meeting?.breakdown?.meeting?.percentage}%</h1>
          </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3 mb-2">
            <div className={`col-span-0 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center`}></div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100">Not Meeting ({meeting?.breakdown?.notMeeting?.ratingRange})</h1>
            </div>
            <div className={`h-6 w-full bg-gray-200`}>
            <div style={{width: `${meeting?.breakdown?.notMeeting?.percentage}%`}} className={`h-6 bg-linear-to-r  dark:bg-linear-to-r from-red-500 to-orange-500`}></div>
            </div>
          </div>
          <div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100">{meeting?.breakdown?.notMeeting?.percentage}%</h1>
          </div>
          </div>
          </div>
        </div>
         }
         {cardToShow?.requiringReview &&<div className="h-full bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-red-950/20 dark:border-none">
          <div className=" mb-4 flex flex-row items-center justify-between">
            <div className="flex items-center justify-center">
              <div className="mr-2 w-8 h-8 rounded-lg  flex items-center justify-center"><TriangleAlert   className="text-amber-500 dark:text-amber-100"/></div>
            <h1 className=" flex items-center text-lg font-bold dark:text-slate-100">{requiringReview?.title}</h1>
          </div>
            <h2 className="whitespace-nowrap bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-amber-400">↓ {requiringReview?.trendValue}%</h2>
          </div>
          <div className="flex-1 flex flex-col justify-evenly">
          {Array.isArray(requiring?.employees) && requiring?.employees?.map((value: any, index: number) => {
           return <>
          {index < CARD_CONTENT_LIMIT_TO_SCROLL && <div className="flex flex-row justify-between mb-2" key={index+1}>
              <div className="inline-flex items-center gap-3"> 
              <h1 className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center dark:bg-none dark:${bgColors[index % bgColors.length]}`}>
                {value.name.split(' ').map((n: any) => n[0]).join('')}
              </h1> 
              <div>
              <h1 className="flex items-center text-sm font-bold dark:text-slate-100">{value?.name}</h1>
              <h1 className="flex items-center text-xs text-slate-500 font-bold dark:text-slate-300">{value?.designation}</h1>
                
              </div>          
              </div>
            <div className="flex flex-col items-end gap-1">
          <span className={`flex items-center text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap
            ${value.reviewReason[0] === 'Low Rating'       ? 'bg-orange-100 text-orange-600 dark:bg-emerald-900/40 dark:text-orange-400' : ''}
            ${value.reviewReason[0] === 'Low Attendance'   ? 'bg-yellow-100 text-yellow-600 dark:bg-emerald-900/40 dark:text-yellow-400' : ''}
            ${value.reviewReason[0] === 'On Notice Period' ? 'bg-red-100 text-red-600 dark:bg-emerald-900/40 dark:text-red-400' : ''}
            ${value.reviewReason[0] === 'Low Satisfaction' ? 'bg-purple-100 text-purple-600 dark:bg-emerald-900/40 dark:text-purple-400' : ''}
          `}>{value.reviewReason[0]}</span>
        </div>
          </div>}
          </>})}
          </div>
          {  Array.isArray(requiring?.employees) && requiring?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && <div className="bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold"><Link className="items-center flex flex-row text-blue-700" to="/home/dashboard/viewmore?target=requiringReview" state={{name:VIEW_MORE_ROUTES_VALUES.requiringReview}}><span>{VIEW_MORE}</span><ArrowRight className=" text-blue-700" /></Link></div>}
         </div>}
    </React.Fragment>
  );
}