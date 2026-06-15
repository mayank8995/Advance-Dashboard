import { useQueryClient } from "@tanstack/react-query";
import KeyMetricCard from "../../components/Card/KeyMetricCard";
import KeyMetric from "../../components/Card/KeyMetric";
import { ATTRITION_INSIGHTS, DEPARTMENT_WISE_HEADCOUNT, REVENUE_TREND_IN_CR, SKILLS_IN_DEMAND, TOP_CLIENTS } from "../../utils/constants";
import RootCharts from "../../components/Charts/RootCharts";
import { useEffect, useState } from "react";

function Analytics(){
          const queryClient = useQueryClient();
          const cachedData: any = queryClient.getQueryData(['initialAnalyticsData']);
          const keyCachedData: any = queryClient.getQueryData(['initialAppData']);
          const [theme, setTheme] = useState<boolean>(false);

          useEffect(() => {
            if(localStorage.getItem("theme") === 'dark') {
                setTheme(true)
            }
            function handleStorageEvent(e:any){
                setTheme(e?.detail?.newValue) 
            }
            window.addEventListener('storage', handleStorageEvent);
            return () => {
            window.removeEventListener('storage', handleStorageEvent);
            };
        }, []);

         return(
             <div className="flex flex-col flex-auto">
                     <KeyMetricCard>
                         <KeyMetric newData={keyCachedData}></KeyMetric>
                     </KeyMetricCard>
                     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                                <RootCharts theme={theme} X={"department"} Y={"count"} title={DEPARTMENT_WISE_HEADCOUNT} chartType={"pie"} data={cachedData?.departmentHeadcount}></RootCharts>
                                <RootCharts theme={theme} name={"Revenue"} X={"month"} Y={"revenueCr"} title={REVENUE_TREND_IN_CR} chartType={"line"} data={cachedData?.revenueTrend}></RootCharts>
                                <RootCharts theme={theme} name={"Attrition"} X={"month"} Y={"rate"} chartType={"line"} data={cachedData?.attritionInsights?.trend} title={ATTRITION_INSIGHTS}></RootCharts>
                                <RootCharts theme={theme} X={"employeeCount"} Y={"skill"} title={SKILLS_IN_DEMAND} chartType={"bar"} data={cachedData?.skillsInDemand}></RootCharts>
                                <RootCharts theme={theme} X={"client"} Y={"contributionPercentage"} title={TOP_CLIENTS} chartType={"pie"} data={cachedData?.topClients}></RootCharts>                                
                     </div>
             </div>
         )
     
}

export default Analytics