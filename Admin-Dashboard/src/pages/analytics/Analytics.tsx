import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import KeyMetricCard from "../../components/Card/KeyMetricCard";
import KeyMetric from "../../components/Card/KeyMetric";
import Card from "../../components/Card/Card";
import { DEPARTMENT_WISE_HEADCOUNT, REVENUE_TREND_IN_CR, SKILLS_IN_DEMAND } from "../../utils/constants";
import RootCharts from "../../components/Charts/RootCharts";

function Analytics(){
          const [data, setData] = useState([]);
          const queryClient = useQueryClient();
          const cachedData: any = queryClient.getQueryData(['initialAnalyticsData']);
          const keyCachedData: any = queryClient.getQueryData(['initialAppData']);
        console.log("cached analytics data", cachedData);
        console.log("cached key metric data", keyCachedData);
            // if (isPending) return 'Loading...'
        
            // if (error) return 'An error has occurred'
         return(
             <div className="flex flex-col flex-auto">
                     <KeyMetricCard>
                         <KeyMetric newData={keyCachedData}></KeyMetric>
                     </KeyMetricCard>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 py-0">
                            <div>
                                <RootCharts X={"department"} Y={"count"} title={DEPARTMENT_WISE_HEADCOUNT} chartType={"pie"} data={cachedData?.departmentHeadcount}></RootCharts>
                            </div>
                            <div >    
                                <RootCharts X={"month"} Y={"revenueCr"} title={REVENUE_TREND_IN_CR} chartType={"line"} data={cachedData?.revenueTrend}></RootCharts>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                            <div >    
                                <RootCharts X={"employeeCount"} Y={"skill"} title={SKILLS_IN_DEMAND} chartType={"bar"} data={cachedData?.skillsInDemand}></RootCharts>
                            </div>
                    </div>
             </div>
         )
     
}

export default Analytics