import Card from "../../components/Card/Card"
import KeyMetric from "../../components/Card/KeyMetric"
import Chart from "../../components/Charts/Chart"
import { useQueryClient } from "@tanstack/react-query";
import { ATTRITION_INSIGHTS, DEPARTMENT_WISE_HEADCOUNT, TOP_PROJECTS } from "../../utils/constants";
import KeyMetricCard from "../../components/Card/KeyMetricCard";
import RootCharts from "../../components/Charts/RootCharts";

function Dashboard(){
    const queryClient = useQueryClient();
    const cachedData: any = queryClient.getQueryData(['initialAppData']);
console
    return(
        <div className="flex flex-col flex-auto">
            <Card>
                <KeyMetricCard>
                    <KeyMetric newData={cachedData}></KeyMetric>
                </KeyMetricCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                    <div>
                        <RootCharts X={"month"} Y={"rate"} chartType={"line"} data={cachedData?.employeeList?.[0]?.attritionInsights?.trend} title={ATTRITION_INSIGHTS}></RootCharts>
                    </div>
                    <div>    
                        <Chart graph={false} newData={cachedData} title={TOP_PROJECTS}></Chart>
                    </div>
                </div>
            </Card>
        </div>
    )

}

export default Dashboard