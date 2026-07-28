import { ArrowRight, Trophy } from 'lucide-react';
import type { PromotedList } from '../../types/types';
import React from 'react';
import {
  bgColors,
  CARD_CONTENT_LIMIT_TO_SCROLL,
  gradients,
  VIEW_MORE,
  VIEW_MORE_ROUTES_VALUES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';

export const PromotedCard = ({ promotedThisYear }: PromotedList) => {
  return (
    <div className=" h-full bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/40  hover:-translate-y-0.5 transition-all duration-200 darK:bg-gradient-to-br dark:from-slate-900 dark:to-green-950/20 dark:border-none">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center justify-center">
          <div className="mr-2 w-8 h-8 rounded-lg  flex items-center justify-center">
            <Trophy className="text-amber-500 dark:text-amber-100" />
          </div>
          <h1 className=" flex items-center text-lg font-bold dark:text-slate-100">
            {promotedThisYear?.title}
          </h1>
        </div>
        <h2 className="whitespace-nowrap bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-emerald-400">
          ↑ {promotedThisYear?.trendValue}%
        </h2>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        {Array.isArray(promotedThisYear?.employees) &&
          promotedThisYear?.employees?.map((value, index: number) => {
            return (
              <React.Fragment key={value.id}>
                {index < CARD_CONTENT_LIMIT_TO_SCROLL && (
                  <div className="flex flex-row justify-between mb-2">
                    <div>
                      <div className="inline-flex items-center gap-3">
                        <h1
                          className={`w-9 h-9 rounded-full text-white font-bold text-sm flex items-center justify-center ${gradients[index % gradients.length]} col-span-0 w-8 h-8 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center dark:bg-none dark:${bgColors[index % bgColors.length]}`}
                        >
                          {value.name
                            .split(' ')
                            .map((n: string) => n[0])
                            .join('')}
                        </h1>
                        <div>
                          <h1 className="flex items-center text-sm font-bold dark:text-slate-100">
                            {value?.name}
                          </h1>
                          <h1 className="flex items-center text-xs text-slate-500 font-bold dark:text-slate-300">
                            {value?.currentDesignation}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h2 className="flex items-center text-xs font-bold dark:text-slate-100">
                        ↑ Promoted On
                      </h2>
                      <h2 className="flex items-center text-xs font-bold dark:text-slate-100">
                        {' '}
                        {value?.promotedOn}
                      </h2>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
      {Array.isArray(promotedThisYear?.employees) &&
        promotedThisYear?.employees?.length > CARD_CONTENT_LIMIT_TO_SCROLL && (
          <div className=" bottom-2 right-2 flex flex-col items-end text-sm text-blue-700 font-bold">
            <Link
              className="items-center flex flex-row text-blue-700"
              to="/home/dashboard/viewmore?target=promotedThisYear"
              state={{ name: VIEW_MORE_ROUTES_VALUES.promotedThisYear }}
            >
              <span>{VIEW_MORE}</span>
              <ArrowRight className=" text-blue-700" />
            </Link>
          </div>
        )}
    </div>
  );
};

export default PromotedCard;
