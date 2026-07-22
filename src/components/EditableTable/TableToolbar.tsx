import React from 'react';
import FormField from '../Form/FormField';
import {
  ArrowUpDown,
  Funnel,
  FunnelX,
  SquareChevronLeft,
  SquareChevronRight,
  X,
} from 'lucide-react';
import { className } from '../../utils/constants';
import type { TableToolbarProps } from '../../types/types';
import { useQueryClient } from '@tanstack/react-query';

export const TableToolbar = ({
  txtToBeSearched,
  setTextToBeSearched,
  tableQueryParams,
  handleRowsPerPageChange,
  openFilterModal,
  openSortModal,
  handlePrevious,
  handleNext,
}: TableToolbarProps) => {
  const queryClient = useQueryClient();
  const isfilterAvailable: any =
    queryClient.getQueryData(['filterKeyData']) || [];
  return (
    <React.Fragment>
      <div className="lg:hidden px-6 py-4">
        <div className="relative">
          <FormField
            style={{ width: '100%' }}
            value={txtToBeSearched}
            className={className}
            type={'text'}
            name={'search'}
            placeholder={'Search...'}
            onChange={(e: any) => setTextToBeSearched(e?.target?.value || '')}
          />
          {txtToBeSearched && (
            <X
              width={18}
              className="cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300"
              onClick={() => setTextToBeSearched('')}
            />
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex-1 justify-between  flex items-center px-6 pb-4">
          <div className="flex flex-row items-center">
            <div className="flex justify-center items-center">
              <label className=" hidden sm:flex text-sm font-bold dark:text-slate-100 pr-2">
                Rows / page{' '}
              </label>
              <select
                value={tableQueryParams.limit}
                onChange={handleRowsPerPageChange}
                className="
            cursor-pointer
            px-2 py-1
            border
            border-slate-300 dark:border-slate-700
            rounded-lg
            bg-white dark:bg-slate-800
            text-sm
            shadow-sm
            focus:ring-2
            focus:ring-blue-500 dark:text-slate-300
            dark:outline-none dark:focus:outline-none
            "
              >
                <option className="text-sm font-bold outline-none" value={2}>
                  2
                </option>
                <option className="text-sm font-bold outline-none" value={3}>
                  3
                </option>
                <option className="text-sm font-bold outline-none" value={5}>
                  5
                </option>
                <option className="text-sm font-bold outline-none" value={10}>
                  10
                </option>
              </select>
            </div>
            {
              <div className="pl-2 flex items-center">
                <div className="cursor-pointer">
                  {isfilterAvailable?.length === 0 ? (
                    <Funnel
                      className="pl-2 text-gray-600 dark:text-gray-100"
                      onClick={openFilterModal}
                    />
                  ) : (
                    <FunnelX
                      className="pl-2 text-gray-600 dark:text-gray-100"
                      onClick={openFilterModal}
                    />
                  )}
                </div>
                <div className="flex sm:hidden">
                  {
                    <ArrowUpDown
                      className="pl-2 text-gray-600 dark:text-gray-100"
                      onClick={openSortModal}
                    />
                  }
                </div>
              </div>
            }
            {/* {<Download />} */}
          </div>
          <div className="flex justify-center items-center">
            <button
              disabled={tableQueryParams.page === 1}
              onClick={handlePrevious}
              className={`p-2 transition-colors ${
                tableQueryParams.page === 1
                  ? 'opacity-40 cursor-not-allowed pointer-events-none  disabled:text-gray-400 dark:disabled:text-gray-100'
                  : 'cursor-pointer text-gray-600 dark:text-gray-100'
              }`}
            >
              <SquareChevronLeft />
            </button>
            <span className="text-xs md:text-sm font-bold  dark:text-slate-100">
              {tableQueryParams.page} / {tableQueryParams.totalPages || 1}
            </span>
            <button
              disabled={
                tableQueryParams.page === tableQueryParams.totalPages ||
                tableQueryParams.totalPages === 0
              }
              onClick={handleNext}
              className={`p-2 transition-colors ${
                tableQueryParams.page === tableQueryParams.totalPages ||
                tableQueryParams.totalPages === 0
                  ? 'opacity-40 cursor-not-allowed pointer-events-none  disabled:text-gray-400 dark:disabled:text-gray-100'
                  : 'cursor-pointer text-gray-600 dark:text-gray-100'
              }`}
            >
              <SquareChevronRight />
            </button>
          </div>
        </div>
        <div className="hidden lg:flex px-6 pb-4">
          <div className="relative">
            <FormField
              value={txtToBeSearched}
              className={className}
              type={'text'}
              name={'search'}
              placeholder={'Search...'}
              onChange={(e: any) => setTextToBeSearched(e?.target?.value || '')}
            />
            {txtToBeSearched && (
              <X
                width={18}
                className="cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300"
                onClick={() => setTextToBeSearched('')}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TableToolbar;
