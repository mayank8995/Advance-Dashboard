import Card from "../../components/Card/Card"
import KeyMetric from "../../components/Card/KeyMetric"
import Chart from "../../components/Charts/Chart"
import { useQueryClient } from "@tanstack/react-query";
import { ATTRITION_INSIGHTS, TOP_PROJECTS } from "../../utils/constants";

function Dashboard(){
    const queryClient = useQueryClient();
    const cachedData: any = queryClient.getQueryData(['initialAppData']);

    return(
        <div className="flex flex-col flex-auto">
            <Card>
                <KeyMetric newData={cachedData}></KeyMetric>
                <div className="flex flex-row flex-1 min-h-0 gap-4 p-4">
                    <div className="flex-[2] min-w-0">
                        <Chart graph={true} title={ATTRITION_INSIGHTS} graphData={cachedData?.employeeList?.[0]?.attritionInsights}></Chart>
                    </div>
                    <div className="flex-[1] min-w-0 flex flex-col gap-4">    
                        <Chart graph={false} newData={cachedData} title={TOP_PROJECTS}></Chart>
                        {/* <Chart></Chart> */}
                    </div>
                </div>
            </Card>
        </div>
    )

}

export default Dashboard