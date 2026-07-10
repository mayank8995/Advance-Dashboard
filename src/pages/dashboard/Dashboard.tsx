import KeyMetric from '../../components/Card/KeyMetric';
import { useQueryClient } from '@tanstack/react-query';
import { TOP_PROJECTS } from '../../utils/constants';
import KeyMetricCard from '../../components/Card/KeyMetricCard';
import TopProjectsCard from '../../components/Card/TopProjectsCard';
import TopPerformersCard from '../../components/Card/TopPerformersCard';
import PromotedCard from '../../components/Card/PromotedCard';
import MeetingKPIsCard from '../../components/Card/MeetingKPIsCard';
import RequiringReviewCard from '../../components/Card/RequiringReviewCard';

function Dashboard() {
  const queryClient = useQueryClient();
  const { data: cachedData }: any = queryClient.getQueryData(['employeesData']);
  const { data: cachedPerformanceCardData }: any = queryClient.getQueryData([
    'performanceCardsData',
  ]);
  return (
    <div className="flex flex-col flex-auto">
      <KeyMetricCard>
        <KeyMetric newData={cachedData}></KeyMetric>
      </KeyMetricCard>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        {/* <Card topProjects={cachedData} title={TOP_PROJECTS} cardToShow={{topProjects: true}}></Card> */}
        <TopProjectsCard topProjects={cachedData} title={TOP_PROJECTS} />
        <TopPerformersCard
          topPerformersList={cachedPerformanceCardData?.topPerformers}
        ></TopPerformersCard>
        <PromotedCard
          promotedThisYear={cachedPerformanceCardData?.promotedThisYear}
        ></PromotedCard>
        <MeetingKPIsCard
          meetingKPIs={cachedPerformanceCardData?.meetingKPIs}
        ></MeetingKPIsCard>
        <RequiringReviewCard
          requiringReview={cachedPerformanceCardData?.requiringReview}
        ></RequiringReviewCard>
      </div>
    </div>
  );
}

export default Dashboard;
