import { useQueryClient } from '@tanstack/react-query';
import KeyMetricCard from '../../components/Card/KeyMetricCard';
import KeyMetric from '../../components/Card/KeyMetric';
import {
  ATTRITION_INSIGHTS,
  DEPARTMENT_WISE_HEADCOUNT,
  REVENUE_TREND_IN_CR,
  SKILLS_IN_DEMAND,
  TOP_CLIENTS,
  TOTAL_PROJECTS,
} from '../../utils/constants';
import React, { Suspense } from 'react';
import type {
  AnalyticsCard,
  ProjectStatusDistribution,
} from '../../types/types';
import DonutCharts from '../../components/Charts/DonutCharts';
const PieChartComponent = React.lazy(
  () => import('../../components/Charts/PieChartComponent')
);
const LineChartComponent = React.lazy(
  () => import('../../components/Charts/LineChartComponent')
);
const BarChartComponent = React.lazy(
  () => import('../../components/Charts/BarChartComponent')
);

const MultiCityBarChartComponent = React.lazy(
  () => import('../../components/Charts/MultiCityBarChartComponent')
);

function Analytics() {
  const queryClient = useQueryClient();
  const { data: metricData }: AnalyticsCard =
    queryClient.getQueryData(['analyticsData']) || {};

  return (
    <div className="flex flex-col flex-auto">
      <KeyMetricCard>
        <KeyMetric metricData={metricData}></KeyMetric>
      </KeyMetricCard>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        <Suspense
          fallback={
            <>
              {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
                (_, id) => {
                  return (
                    <div
                      key={`suspense-${id}`}
                      className="w-full max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow animate-pulse dark:bg-gray-800 dark:border-gray-700"
                    >
                      <div className="flex flex-col">
                        <div className="h-3 w-25 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div
                        className="mx-auto w-44 h-44 rounded-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden"
                        style={{
                          background:
                            'conic-gradient(#e5e7eb 0% 40%, #ffffff 40% 41%, #e5e7eb 41% 75%, #ffffff 75% 76%, #e5e7eb 76% 100%)',
                        }}
                      >
                        <div
                          className="hidden dark:block absolute inset-0 rounded-full"
                          style={{
                            background:
                              'conic-gradient(#374151 0% 40%, #1f2937 40% 41%, #374151 41% 75%, #1f2937 75% 76%, #374151 76% 100%)',
                          }}
                        ></div>
                      </div>
                      <div className="flex flex-col mt-6">
                        <div className="h-3 w-25 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="h-3 w-25 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="h-3 w-25 mt-6 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </div>
                  );
                }
              )}
            </>
          }
        >
          <PieChartComponent
            X={'client'}
            Y={'revenueCr'}
            title={TOP_CLIENTS}
            data={metricData?.topClients}
          />

          <LineChartComponent
            name={'Revenue'}
            X={'month'}
            Y={'revenueCr'}
            title={REVENUE_TREND_IN_CR}
            data={metricData?.revenueTrend}
          />
          <DonutCharts
            title={TOTAL_PROJECTS}
            data={
              metricData?.projectStatusDistribution as ProjectStatusDistribution
            }
          />
          <MultiCityBarChartComponent
            name={'Head Count by Location'}
            X={'city'}
            Y={'employeeCount'}
            data={metricData?.headcountByLocation}
            title={'Head Count by Location'}
          />
          <PieChartComponent
            X={'department'}
            Y={'count'}
            title={DEPARTMENT_WISE_HEADCOUNT}
            data={metricData?.departmentHeadcount}
          />

          <LineChartComponent
            name={'Attrition'}
            X={'month'}
            Y={'rate'}
            data={metricData?.attritionInsights?.trend}
            title={ATTRITION_INSIGHTS}
          />
          <BarChartComponent
            X={'employeeCount'}
            Y={'skill'}
            title={SKILLS_IN_DEMAND}
            data={metricData?.skillsInDemand}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default Analytics;
