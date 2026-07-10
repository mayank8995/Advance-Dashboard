import { Target } from 'lucide-react';
import type { MeetingKPIList } from '../../types/types';

export default function MeetingKPIsCard({ meetingKPIs }: MeetingKPIList) {
  return (
    <div className=" h-full  bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3 hover:shadow-xl hover:shadow-indigo-100/50 hover:-translate-y-0.5 transition-all duration-200 dark:bg-linear-to-br dark:from-slate-900 dark:to-indigo-950/20 dark:border-none">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex items-center justify-center">
          <div className="mr-2 w-8 h-8 rounded-lg  flex items-center justify-center">
            <Target className="text-amber-500 dark:text-amber-100" />
          </div>
          <h1 className=" flex items-center text-lg font-bold dark:text-slate-100">
            {meetingKPIs?.title}
          </h1>
        </div>
        <h2 className="whitespace-nowrap bg-green-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center dark:bg-emerald-900/40 dark:text-emerald-400">
          ↑ {meetingKPIs?.trendValue}%
        </h2>
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        <div className="mb-2">
          <h1 className="flex items-center text-sm font-bold dark:text-slate-100">
            {meetingKPIs?.percentage} / 100 employees
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3 mb-2">
              <div
                className={`col-span-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center`}
              ></div>
              <h1 className="flex items-center text-xs font-bold dark:text-slate-100">
                Exceeding ({meetingKPIs?.breakdown?.exceeding?.ratingRange})
              </h1>
            </div>
            <div className={`h-6 w-full bg-gray-200`}>
              <div
                style={{
                  width: `${meetingKPIs?.breakdown?.exceeding?.percentage}% `,
                }}
                className={`h-6  bg-linear-to-r from-emerald-400 to-green-600 dark:bg-linear-to-r `}
              ></div>
            </div>
          </div>
          <div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100">
              {meetingKPIs?.breakdown?.exceeding?.percentage}%
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3 mb-2">
              <div
                className={`col-span-0 w-6 h-6 rounded-full bg-violet-500 text-white text-xs font-bold flex items-center justify-center`}
              ></div>
              <h1 className="flex items-center text-xs font-bold dark:text-slate-100">
                Meeting ({meetingKPIs?.breakdown?.meeting?.ratingRange})
              </h1>
            </div>
            <div className={`h-6 w-full bg-gray-200`}>
              <div
                style={{
                  width: `${meetingKPIs?.breakdown?.meeting?.percentage}%`,
                }}
                className={`h-6 bg-linear-to-r  dark:bg-linear-to-r from-violet-600 to-indigo-700`}
              ></div>
            </div>
          </div>
          <div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100">
              {meetingKPIs?.breakdown?.meeting?.percentage}%
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <div className="inline-flex items-center gap-3 mb-2">
              <div
                className={`col-span-0 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center`}
              ></div>
              <h1 className="flex items-center text-xs font-bold dark:text-slate-100">
                Not Meeting ({meetingKPIs?.breakdown?.notMeeting?.ratingRange})
              </h1>
            </div>
            <div className={`h-6 w-full bg-gray-200`}>
              <div
                style={{
                  width: `${meetingKPIs?.breakdown?.notMeeting?.percentage}%`,
                }}
                className={`h-6 bg-linear-to-r  dark:bg-linear-to-r from-red-500 to-orange-500`}
              ></div>
            </div>
          </div>
          <div>
            <h1 className="flex items-center text-xs font-bold dark:text-slate-100">
              {meetingKPIs?.breakdown?.notMeeting?.percentage}%
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
