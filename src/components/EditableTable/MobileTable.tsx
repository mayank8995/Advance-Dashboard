import { TextSearch } from 'lucide-react';
import MobileViewCardForTable from './MobileViewCardForTable';
import { NO_RESULT_FOUND } from '../../utils/constants';
import type { MobileTableProps } from '../../types/types';

export const MobileTable = ({ list, headersData }: MobileTableProps) => {
  return (
    <div className="sm:hidden pl-2 pr-2">
      {list?.length > 0 ? (
        <MobileViewCardForTable list={list} headersData={headersData} />
      ) : (
        <div className="bg-linear-to-br from-white to-indigo-50/40 rounded-2xl border-t-4 shadow-sm border border-slate-100 p-5 flex flex-col gap-3  dark:bg-linear-to-br dark:from-slate-900 dark:to-purple-950/20  mb-2   dark:border-slate-900/50">
          <h1 className="dark:text-slate-100 text-slate-800">
            <span className="flex items-center justify-center">
              <TextSearch className="pr-1" />
              {NO_RESULT_FOUND}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default MobileTable;
