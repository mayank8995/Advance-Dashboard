import {
  getAvgEmployeeSatisfaction,
  getNumberofActiveProjects,
} from '../../services/utils.service';
import { KEY_TRACK_METRIC, KEY_TRACK_METRIC_ICON } from '../../utils/constants';
import { Flag, MonitorCheck, Star, User } from 'lucide-react';

export default function KeyMetric({ newData }: any) {
  const data: any = {
    [KEY_TRACK_METRIC['TOTAL_EMPLOYEES']]: {
      value: newData?.employeeList?.[0]?.totalEmployeeCount,
      icon: KEY_TRACK_METRIC_ICON['USER'],
    },
    [KEY_TRACK_METRIC['NOTICE_PERIOD_EMP']]: {
      value: newData?.employeeList?.[0]?.totalNoticePeriodEmployeeCount,
      icon: KEY_TRACK_METRIC_ICON['FLAG'],
    },
    [KEY_TRACK_METRIC['AVG_EMP_SAT']]: {
      value: `${getAvgEmployeeSatisfaction(newData?.employeeList?.[0]?.employees)} / 5`,
      icon: KEY_TRACK_METRIC_ICON['STAR'],
    },
    [KEY_TRACK_METRIC['ACTV_PROJ']]: {
      value: getNumberofActiveProjects(newData?.employeeList?.[0]?.employees),
      icon: KEY_TRACK_METRIC_ICON['MONITER_CHECK'],
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {data &&
        Object?.keys(data).map((key, i) => (
          <div
            key={i}
            className={`items-start bg-linear-to-br from-white to-indigo-50/40 border border-slate-200 rounded-xl flex flex-col gap-3 p-2 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-blue-950/20 dark:border-none
            ${data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && 'border-l-4 border-l-blue-500 dark:border-l-blue-400'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['FLAG'] && 'border-l-4 border-l-orange-500 dark:border-l-orange-400'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['MONITER_CHECK'] && 'border-l-4 border-l-purple-500 dark:border-l-purple-400'}
              ${data[key]?.icon === KEY_TRACK_METRIC_ICON['STAR'] && 'border-l-4 border-l-green-500 dark:border-l-green-400'}
            `}
          >
            <div className="items-center flex flex-row ">
              <div
                className={`h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center`}
              >
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['USER'] && (
                  <User className="h-6 w-6 text-blue-600" size={5} />
                )}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['FLAG'] && (
                  <Flag className="h-6 w-6 text-orange-600" size={5} />
                )}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['MONITER_CHECK'] && (
                  <MonitorCheck className="h-6 w-6 text-purple-600" size={5} />
                )}
                {data[key]?.icon === KEY_TRACK_METRIC_ICON['STAR'] && (
                  <Star className="h-6 w-6 text-green-600" size={5} />
                )}
              </div>
              <div className="pl-2 flex flex-col">
                <div className="hidden sm:flex items-center mb-1 text-sm text-slate-500 font-medium dark:text-slate-100 w-50 truncate">
                  {key.length > 20 ? `${key.substring(0, 20)}...` : key}
                </div>
                <div className="sm:hidden items-center mb-1 text-sm text-slate-500 font-medium dark:text-slate-100">
                  {key}
                </div>
                <h2 className="text-xl font-bold text-indigo-600 drop-shadow-sm ">
                  {data[key]?.value}
                </h2>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
