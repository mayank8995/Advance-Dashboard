import React from 'react';
import FormField from '../Form/FormField';
import {
  ArrowUpDown,
  Download,
  Funnel,
  FunnelX,
  SquareChevronLeft,
  SquareChevronRight,
  X,
} from 'lucide-react';
import { className } from '../../utils/constants';
import type { SelectedChip, TableToolbarProps } from '../../types/types';
import { useQueryClient } from '@tanstack/react-query';

const TableToolbar = ({
  txtToBeSearched,
  setTextToBeSearched,
  tableQueryParams,
  handleRowsPerPageChange,
  openFilterModal,
  openSortModal,
  handlePrevious,
  handleNext,
  bulkAction,
  selectedRow,
  handleOnChange,
}: TableToolbarProps) => {
  const queryClient = useQueryClient();
  const isfilterAvailable: SelectedChip[] =
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
            onChange={(e) => setTextToBeSearched(e?.target?.value || '')}
          />
          {txtToBeSearched && (
            <button onClick={() => setTextToBeSearched('')}>
              <X
                width={18}
                className="cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300"
              />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex-1 justify-between  flex items-center px-6 pb-4">
          <div className="gap-2 flex flex-row items-center">
            <div className="flex justify-center items-center">
              <span className=" hidden lg:flex text-sm font-bold dark:text-slate-100 pr-2">
                Rows / page{' '}
              </span>
              <select
                id="limit"
                name="limit"
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
              <div className="gap-2 flex items-center">
                <button className="cursor-pointer" onClick={openFilterModal}>
                  <span title="Filter">
                    {isfilterAvailable?.length === 0 ? (
                      <Funnel
                        size={20}
                        className=" text-gray-600 dark:text-gray-100"
                      />
                    ) : (
                      <FunnelX
                        size={20}
                        className=" text-gray-600 dark:text-gray-100"
                      />
                    )}
                  </span>
                </button>
                <button
                  className="cursor-pointer flex lg:hidden"
                  onClick={openSortModal}
                >
                  {
                    <span title="Sort">
                      <ArrowUpDown
                        size={20}
                        className=" text-gray-600 dark:text-gray-100"
                      />
                    </span>
                  }
                </button>
                <button
                  disabled={selectedRow.size === 0}
                  className={`${selectedRow.size === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={bulkAction}
                >
                  <span title="Download csv">
                    <Download
                      size={20}
                      color={selectedRow.size === 0 ? '#9ca3af' : '#2563eb'}
                      className={`text-gray-600 dark:text-gray-100`}
                    />
                  </span>
                </button>
                <div
                  title="Select All"
                  className="flex lg:hidden items-center justify-center border-2 border-slate-950 border-dotted dark:border-slate-100 w-5 h-5"
                >
                  <FormField
                    name={'selectAll'}
                    type={'checkbox'}
                    id={'selectAll'}
                    checked={selectedRow.has('selectAll')}
                    onChange={handleOnChange}
                    className={`m-0 cursor-pointer`}
                  />
                </div>
              </div>
            }
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
              onChange={(e) => setTextToBeSearched(e?.target?.value || '')}
            />
            {txtToBeSearched && (
              <button onClick={() => setTextToBeSearched('')}>
                <X
                  width={18}
                  className="cursor-pointer absolute bottom-0 right-1.5 top-2.5 dark:text-slate-300"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(TableToolbar);
