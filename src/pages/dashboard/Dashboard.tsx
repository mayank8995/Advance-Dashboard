import Card from "../../components/Card/Card"
import KeyMetric from "../../components/Card/KeyMetric"
import { useQueryClient } from "@tanstack/react-query";
import { TOP_PROJECTS } from "../../utils/constants";
import KeyMetricCard from "../../components/Card/KeyMetricCard";

function Dashboard(){
    const queryClient = useQueryClient();
    const cachedData: any = queryClient.getQueryData(['initialAppData']);
    const cachedPerformanceCardData: any = queryClient.getQueryData(['initialPerformanceCardsData']);
    // console.log("cached performance card data", cachedPerformanceCardData);
    return(
        <div className="flex flex-col flex-auto">
                <KeyMetricCard>
                    <KeyMetric newData={cachedData}></KeyMetric>
                </KeyMetricCard>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                        <Card topProjects={cachedData} title={TOP_PROJECTS} cardToShow={{topProjects: true}}></Card>
                        <Card topPerformersList={cachedPerformanceCardData?.topPerformers} cardToShow={{topPerformers: true}}></Card>
                        <Card promotedThisYear={cachedPerformanceCardData?.promotedThisYear} cardToShow={{promotedThisYear: true}}></Card>
                        <Card meetingKPIs={cachedPerformanceCardData?.meetingKPIs} cardToShow={{meetingKPIs: true}}></Card>
                        <Card requiringReview={cachedPerformanceCardData?.requiringReview} cardToShow={{requiringReview: true}}></Card>
                    </div>
        </div>
    )

}

export default Dashboard