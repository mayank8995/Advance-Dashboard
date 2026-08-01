import { X } from 'lucide-react';
import React from 'react';
import StatusBadge from '../UtilComponents/StatusBadge';
import { accordians } from '../Accordian/AccordianRenderer';
import Accordion from '../Accordian/Accordian';
import { useEmployeeDetail } from '../../services/utils.service';
import EmployeeDetailSkeleton from '../Skeleton/EmployeeDetailSkeleton';
import ErrorPage from '../Error/ErrorPage';

const DetailModal = ({ onClose, id }: { onClose: () => void; id: number }) => {
  const { data: details, isError, isLoading } = useEmployeeDetail({ id });
  const row = details?.['data'] ?? [];
  return (
    <>
      {!isLoading ? (
        <div className="p-4">
          {!isError ? (
            <>
              <div className="flex flex-row justify-between items-center">
                <h1 className="text-sm font-bold text-slate-900 dark:text-white">
                  Employee Details
                </h1>
                <button onClick={onClose}>
                  <X
                    className={
                      'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 cursor-pointer'
                    }
                    width={16}
                    height={20}
                  />
                </button>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] gap-4 pt-4 pb-4">
                <div className="flex items-center w-15 h-15 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                  <img
                    loading="eager"
                    src={'/avatar_fallback.svg'}
                    className="aspect-square w-full h-full object-cover"
                    alt="User Profile"
                  />
                </div>
                <dl>
                  <dd className="text-sm font-bold leading-normal dark:text-white">
                    {row?.name}
                  </dd>
                  <dd className="text-xs whitespace-nowrap overflow-hidden text-ellipsis font-semibold dark:text-white">
                    {row?.designation}
                  </dd>
                  <dd className="text-xs whitespace-nowrap overflow-hidden text-ellipsis text-slate-600 font-semibold">
                    {row?.department}
                  </dd>
                </dl>
                <div>
                  <StatusBadge
                    value={!row?.onNoticePeriod ? 'Active' : 'On Notice'}
                  />
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col ">
                <div className="">
                  {accordians.map((accordian) => {
                    return (
                      <React.Fragment key={accordian.id}>
                        <Accordion accordian={accordian} content={row} />
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <ErrorPage />
          )}
        </div>
      ) : (
        <EmployeeDetailSkeleton />
      )}
    </>
  );
};

export default React.memo(DetailModal);
