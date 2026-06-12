import { useQueryClient } from "@tanstack/react-query";
import KeyMetricCard from "../../components/Card/KeyMetricCard";
import KeyMetric from "../../components/Card/KeyMetric";
import { ATTRITION_INSIGHTS, DEPARTMENT_WISE_HEADCOUNT, REVENUE_TREND_IN_CR, SKILLS_IN_DEMAND, TOP_CLIENTS } from "../../utils/constants";
import RootCharts from "../../components/Charts/RootCharts";

function Analytics(){
          const queryClient = useQueryClient();
          const cachedData: any = queryClient.getQueryData(['initialAnalyticsData']);
          const keyCachedData: any = queryClient.getQueryData(['initialAppData']);

         return(
             <div className="flex flex-col flex-auto">
                     <KeyMetricCard>
                         <KeyMetric newData={keyCachedData}></KeyMetric>
                     </KeyMetricCard>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 py-0">
                                <RootCharts X={"department"} Y={"count"} title={DEPARTMENT_WISE_HEADCOUNT} chartType={"pie"} data={cachedData?.departmentHeadcount}></RootCharts>
                                <RootCharts name={"Revenue"} X={"month"} Y={"revenueCr"} title={REVENUE_TREND_IN_CR} chartType={"line"} data={cachedData?.revenueTrend}></RootCharts>
                                <RootCharts name={"Attrition"} X={"month"} Y={"rate"} chartType={"line"} data={cachedData?.attritionInsights?.trend} title={ATTRITION_INSIGHTS}></RootCharts>
                                <RootCharts X={"employeeCount"} Y={"skill"} title={SKILLS_IN_DEMAND} chartType={"bar"} data={cachedData?.skillsInDemand}></RootCharts>
                                <RootCharts X={"client"} Y={"contributionPercentage"} title={TOP_CLIENTS} chartType={"pie"} data={cachedData?.topClients}></RootCharts>                                
                     </div>
             </div>
         )
     
}

export default Analytics