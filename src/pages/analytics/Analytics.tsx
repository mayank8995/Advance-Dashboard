import { useQueryClient } from "@tanstack/react-query";
import KeyMetricCard from "../../components/Card/KeyMetricCard";
import KeyMetric from "../../components/Card/KeyMetric";
import { ATTRITION_INSIGHTS, DEPARTMENT_WISE_HEADCOUNT, REVENUE_TREND_IN_CR, SKILLS_IN_DEMAND, TOP_CLIENTS } from "../../utils/constants";
import React, { Suspense } from "react";
import { TailSpin } from "react-loader-spinner";
const PieChartComponent = React.lazy(() => import('../../components/Charts/PieChartComponent'));
const LineChartComponent = React.lazy(() => import('../../components/Charts/LineChartComponent'));
const BarChartComponent = React.lazy(() => import('../../components/Charts/BarChartComponent'));


function Analytics(){
    console.log("IN HEERRRRRRRERERE!!!!")
          const queryClient = useQueryClient();
          const {data: cachedData}: any = queryClient.getQueryData(['analyticsData']);
          const {data: keyCachedData}: any = queryClient.getQueryData(['employeesData']);
         return(
             <div className="flex flex-col flex-auto">
                     <KeyMetricCard>
                         <KeyMetric newData={keyCachedData}></KeyMetric>
                     </KeyMetricCard>
                     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                            <Suspense fallback={<div className="flex flex-col h-full justify-center bg-gradient-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200  dark:bg-gradient-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
                                <TailSpin
                                visible={true}
                                height="80"
                                width="80"
                                color="#4F46E5"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass="flex items-center justify-center min-h-screen"
                            /></div>}>
                                <PieChartComponent  X={"department"} Y={"count"} title={DEPARTMENT_WISE_HEADCOUNT} chartType={"pie"} data={cachedData?.departmentHeadcount}/>
                                <LineChartComponent  name={"Revenue"} X={"month"} Y={"revenueCr"} title={REVENUE_TREND_IN_CR} chartType={"line"} data={cachedData?.revenueTrend}/>
                                <LineChartComponent  name={"Attrition"} X={"month"} Y={"rate"} chartType={"line"} data={cachedData?.attritionInsights?.trend} title={ATTRITION_INSIGHTS}/>
                                <BarChartComponent  X={"employeeCount"} Y={"skill"} title={SKILLS_IN_DEMAND} chartType={"bar"} data={cachedData?.skillsInDemand}/>
                                <PieChartComponent  X={"client"} Y={"contributionPercentage"} title={TOP_CLIENTS} chartType={"pie"} data={cachedData?.topClients}/>                               
                           </Suspense>
                     </div>
             </div>
         )
     
}

export default Analytics