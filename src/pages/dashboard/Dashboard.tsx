/* eslint-disable @typescript-eslint/no-misused-promises */
import KeyMetric from '../../components/Card/KeyMetric';
import { TOP_PROJECTS } from '../../utils/constants';
import KeyMetricCard from '../../components/Card/KeyMetricCard';
import TopProjectsCard from '../../components/Card/TopProjectsCard';
import TopPerformersCard from '../../components/Card/TopPerformersCard';
import PromotedCard from '../../components/Card/PromotedCard';
import MeetingKPIsCard from '../../components/Card/MeetingKPIsCard';
import RequiringReviewCard from '../../components/Card/RequiringReviewCard';
import type {
  TopProjectEmployeeResponse,
  MeetingKPIsCardProps,
  PromotedThisYearCardProps,
  RequiringReviewCardProps,
  TopPerformersCardProps,
  TableTypeMap,
} from '../../types/types';
import { useAllData } from '../../services/utils.service';
import Skeleton from '../../components/Skeleton/Skeleton';
import ErrorPage from '../../components/Error/ErrorPage';

function Dashboard() {
  const results = useAllData({
    tableType: 'topProjects' as keyof TableTypeMap,
    page: 1,
    limit: 5,
  });
  const metricData = results[0]?.data?.data;
  const cachedPerformanceCardData = results[1]?.data?.data;
  const topProjects = results[2]?.data;
  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);
  const refetchAll = () => {
    results.forEach((result) => result.refetch());
  };

  return (
    <>
      {!isLoading ? (
        <div className="flex flex-col flex-auto">
          {!isError ? (
            <>
              <KeyMetricCard>
                <KeyMetric metricData={metricData}></KeyMetric>
              </KeyMetricCard>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-2 xl:p-4">
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
                <TopProjectsCard
                  topProjects={
                    topProjects?.['data'] as TopProjectEmployeeResponse
                  }
                  title={TOP_PROJECTS}
                  isError={isError}
                  isLoading={isLoading}
                  refetch={refetchAll}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-col flex-1 h-screen overflow-y-auto justify-center items-center dark:bg-gray-800">
              <ErrorPage refetchAll={refetchAll} />{' '}
            </div>
          )}
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
}
// {!isLoading ? (
//             <div
//               data-test="home"
//               className="flex-1 overflow-y-auto dark:bg-gray-800"
//             >
//               {!isError ? (
//                 <Outlet />
//               ) : (
//                 <div className="flex flex-col flex-1 h-screen overflow-y-auto justify-center items-center dark:bg-gray-800">
//                   <ErrorPage refetchAll={refetchAll} />{' '}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Skeleton />
//           )}
export default Dashboard;
