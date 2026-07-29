/* eslint-disable @typescript-eslint/no-misused-promises */
import KeyMetric from '../../components/Card/KeyMetric';
import { useQueryClient } from '@tanstack/react-query';
import { TOP_PROJECTS } from '../../utils/constants';
import KeyMetricCard from '../../components/Card/KeyMetricCard';
import TopProjectsCard from '../../components/Card/TopProjectsCard';
import TopPerformersCard from '../../components/Card/TopPerformersCard';
import PromotedCard from '../../components/Card/PromotedCard';
import MeetingKPIsCard from '../../components/Card/MeetingKPIsCard';
import RequiringReviewCard from '../../components/Card/RequiringReviewCard';
import type {
  AnalyticsCard,
  TopProjectEmployeeResponse,
  KeyMetricCards,
  MeetingKPIsCardProps,
  PromotedThisYearCardProps,
  RequiringReviewCardProps,
  TopPerformersCardProps,
} from '../../types/types';
import { usePerFormanceTableData } from '../../services/utils.service';

function Dashboard() {
  const {
    data: topProjects,
    isError,
    isLoading,
    refetch,
  } = usePerFormanceTableData({
    tableType: 'topProjects',
    page: 1,
    limit: 5,
  });
  const queryClient = useQueryClient();
  const { data: metricData }: AnalyticsCard =
    queryClient.getQueryData(['analyticsData']) || {};
  const { data: cachedPerformanceCardData }: KeyMetricCards =
    queryClient.getQueryData(['performanceCardsData']) || {};

  return (
    <div className="flex flex-col flex-auto">
      <KeyMetricCard>
        <KeyMetric metricData={metricData}></KeyMetric>
      </KeyMetricCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        {/* <Card topProjects={cachedData} title={TOP_PROJECTS} cardToShow={{topProjects: true}}></Card> */}
        <TopProjectsCard
          topProjects={topProjects?.['data'] as TopProjectEmployeeResponse}
          title={TOP_PROJECTS}
          isError={isError}
          isLoading={isLoading}
          refetch={refetch}
        />
        <TopPerformersCard
          topPerformersList={
            cachedPerformanceCardData?.topPerformers as TopPerformersCardProps
          }
        ></TopPerformersCard>
        <PromotedCard
          promotedThisYear={
            cachedPerformanceCardData?.promotedThisYear as PromotedThisYearCardProps
          }
        ></PromotedCard>
        <RequiringReviewCard
          requiringReview={
            cachedPerformanceCardData?.requiringReview as RequiringReviewCardProps
          }
        ></RequiringReviewCard>
        <MeetingKPIsCard
          meetingKPIs={
            cachedPerformanceCardData?.meetingKPIs as MeetingKPIsCardProps
          }
        ></MeetingKPIsCard>
      </div>
    </div>
  );
}

export default Dashboard;
