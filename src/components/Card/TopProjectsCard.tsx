import { ArrowRight, Briefcase } from 'lucide-react';
import {
  CARD_CONTENT_LIMIT_TO_SCROLL,
  PROJECT_DETAILS,
  RISK_STATUS,
  VIEW_MORE,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import React from 'react';
import { Link } from 'react-router-dom';
import type { TopProjectsList } from '../../types/types';
import ErrorPage from '../Error/ErrorPage';

const TopProjectsCard = ({
  topProjects,
  title,
  isError,
  isLoading,
  refetch,
}: TopProjectsList) => {
  const topProj = topProjects?.employees;

  return (
    <div className="h-full bg-linear-to-br from-white to-indigo-50/40 rounded-xl border-t-4 shadow-sm border border-slate-100 p-4 xl:p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40  hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20 dark:border-none">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center justify-center">
          <div className="mr-2 h-5 w-5 xl:h-6 xl:w-6 rounded-lg flex items-center justify-center">
            {<Briefcase className="text-amber-500 dark:text-amber-100" />}
          </div>
          <h1 className=" flex items-center text-sm xl:text-base font-bold dark:text-slate-100">
            {title}
          </h1>
        </div>
      </div>
      <>
        {!isLoading ? (
          <>
            {!isError ? (
              <div className="flex-1 flex flex-col justify-evenly">
                {Array.isArray(topProj) &&
                  topProj?.map((value, index: number) => {
                    return (
                      <React.Fragment key={value.name + index}>
                        {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                          <div className="flex flex-row mb-2 flex-1 min-w-0">
                            {RISK_STATUS.COMPLETED === value?.riskStatus && (
                              <div className="h-auto bg-green-700 w-1.5 xl:w-2 rounded-full "></div>
                            )}
                            {RISK_STATUS.AT_RISK === value?.riskStatus && (
                              <div className="h-auto bg-red-700 w-1.5 xl:w-2 rounded-full"></div>
                            )}
                            {RISK_STATUS.ON_TRACK === value?.riskStatus && (
                              <div className="h-auto bg-green-500 w-1.5 xl:w-2 rounded-full"></div>
                            )}
                            <div className="p-2 flex flex-row justify-between max-xs:flex-col max-xs:gap-2 w-full flex-1 min-w-0">
                              <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-gray-950 font-bold text-sm dark:text-slate-100 truncate">
                                  {value?.projectName}
                                </span>
                                <span className="mb-1 text-xs text-slate-500 font-bold dark:text-slate-300 truncate">
                                  {PROJECT_DETAILS.MANAGER}:&nbsp;
                                  {value?.name && value?.name.length > 20
                                    ? value.name
                                        .split(' ')
                                        .map((n: string) => n[0])
                                        .join('')
                                    : value.name}
                                </span>
                              </div>
                              <div className="shrink-0 self-start max-xs:self-end min-w-0 items-center flex justify-end">
                                <span
                                  className={`whitespace-nowrap ${RISK_STATUS.AT_RISK === value?.riskStatus ? 'bg-orange-400 text-white font-semibold px-2 py-0.5 rounded-full text-[10px] xl:text-xs dark:bg-emerald-900/40 dark:text-orange-400' : 'bg-emerald-400 text-white font-semibold px-2 py-0.5 rounded-full text-[10px] xl:text-xs dark:bg-emerald-900/40 dark:text-emerald-400'}`}
                                >
                                  {value?.riskStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
              </div>
            ) : (
              <ErrorPage refetchAll={() => refetch?.()} />
            )}
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-evenly">
            {Array.from({ length: 5 }, (_, index) => index + 1)?.map(
              (_, index) => (
                <React.Fragment key={`w-9-${index}`}>
                  <div className="flex flex-row mb-2">
                    <div className="w-2 h-9 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 rounded-full ">
                      <h1
                        className={`animate-pulse w-2 h-9 rounded-full bg-gray-200 dark:bg-gray-700 dark:border-gray-700 text-white font-bold text-sm flex items-center justify-center  col-span-0`}
                      ></h1>
                    </div>
                    <div className="p-2 flex flex-row justify-between w-full">
                      <div className="flex flex-col justify-between">
                        <span className=" animate-pulse h-2 w-10 font-bold text-sm bg-gray-200 dark:bg-gray-700 dark:border-gray-700 mb-2"></span>
                        <span className=" animate-pulse h-2 w-10 mb-1 flex items-center text-xs text-slate-500 font-bold dark:text-slate-300 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 "></span>
                      </div>
                      <div className="items-center flex justify-end">
                        <span
                          className={`animate-pulse h-2 w-10 bg-gray-200 dark:bg-gray-700 dark:border-gray-700 `}
                        ></span>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              )
            )}
          </div>
        )}
      </>
      {Array.isArray(topProj) && (
        <div className=" bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold">
          <Link
            className="items-center flex flex-row text-blue-700"
            to="/home/dashboard/viewmore?target=topProjects"
            state={{ name: VIEW_MORE_ROUTES_VALUES.top_projects }}
          >
            <span>{VIEW_MORE}</span>
            <ArrowRight className=" text-blue-700" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default React.memo(TopProjectsCard);
