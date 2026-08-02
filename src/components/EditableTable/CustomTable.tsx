import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React, { useState, useEffect, type ChangeEvent } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumbs';
import { useQueryClient } from '@tanstack/react-query';
import FilterModal from '../FilterComponent/FilterModal';
import SortModalComponent from '../SortModal/SortModalComponent';
import TableToolbar from './TableToolbar';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import type {
  CustomTableProps,
  ListType,
  SelectedChip,
} from '../../types/types';
import EmployeeTableSkeleton from '../Skeleton/EmployeeTableSkeleton';
import ErrorPage from '../Error/ErrorPage';
import { useCheckBox } from '../../hooks/useCheckBox';
import { exportSelected } from '../../services/utils.service';
import { toast } from 'react-toastify';
// const FilterModal = React.lazy(() => import('../FilterComponent/FilterModal'));
// const SortModalComponent = React.lazy(
//   () => import('../SortModal/SortModalComponent')
// );

function CustomTable<T extends ListType>(props: CustomTableProps<T>) {
  const {
    list,
    tableQueryParams,
    handleTableQuery,
    columnsData,
    headersData,
    title,
    setQuery,
    isError,
    isLoading,
    refetch,
  } = props;
  const { selectedRow, setSelectedRow, handleOnChange, ref } =
    useCheckBox(list);
  const queryClient = useQueryClient();
  const [txtToBeSearched, setTxtToBeSearched] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [downloading, setDownloading] = useState(false);
  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['filterKeyData'], exact: true });
  }, []);
  useLockBodyScroll(showModal);
  useLockBodyScroll(showSortModal);

  function handleNext() {
    handleTableQuery({
      ...tableQueryParams,
      page: Math.min(
        tableQueryParams.page + 1,
        tableQueryParams?.totalPages || 0
      ),
      limit: tableQueryParams.limit,
    });
  }
  function handlePrevious() {
    handleTableQuery({
      ...tableQueryParams,
      page: tableQueryParams.page - 1,
      limit: tableQueryParams.limit,
    });
  }

  useEffect(() => {
    const controller = new AbortController();
    const timerId = setTimeout(() => {
      handleTableQuery(
        {
          ...tableQueryParams,
          page: 1,
          search: txtToBeSearched,
        },
        controller.signal
      );
    }, 300);
    return () => {
      clearTimeout(timerId);
      controller.abort();
    };
  }, [txtToBeSearched]);

  // Handler functions
  const handleSort = (key: string) => {
    let direction = 'asc';
    if (tableQueryParams.sortBy === key && tableQueryParams.order === 'asc') {
      direction = 'desc';
    }
    handleTableQuery({
      ...tableQueryParams,
      page: 1,
      sortBy: key,
      order: direction as 'asc' | 'desc',
    });
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e?.target?.value));
    handleTableQuery({
      ...tableQueryParams,
      page: 1,
      limit: Number(e?.target?.value),
    });
  };

  const getSortIcon = (key: string) => {
    if (tableQueryParams.sortBy !== key) {
      return (
        <ArrowUpDown className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400" />
      );
    }
    return tableQueryParams.order === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400" />
    ) : (
      <ArrowDown className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400" />
    );
  };

  const openFilterModal = () => {
    setShowModal(true);
    queryClient.setQueryData(['openmodal'], true);
  };

  const openSortModal = () => {
    setShowSortModal(true);
    queryClient.setQueryData(['opensortmodal'], true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeSortModal = () => {
    setShowSortModal(false);
  };

  const submitFilterData = (data: SelectedChip[]) => {
    queryClient.setQueryData(['filterKeyData'], data);
    closeModal();
    handleTableQuery({ ...tableQueryParams, page: 1 });
  };

  const clearAllFilter = () => {
    queryClient.removeQueries({ queryKey: ['filterKeyData'], exact: true });
    handleTableQuery({ ...tableQueryParams, page: 1 });
  };

  const bulkAction = async () => {
    try {
      setDownloading(true);
      const response = await exportSelected(
        selectedRow,
        list,
        headersData,
        tableQueryParams?.tableType ?? 'employee'
      );
      setDownloading(false);
      toast.success(response.message);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Error in downloading. Please try again.';
      toast.error(errorMessage);
    } finally {
      setDownloading(false);
    }
  };
  return (
    <>
      {!isLoading ? (
        <div className="min-h-screen bg-slate-50 p-2 xl:p-4 dark:bg-gray-800">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex-1 overflow-x-auto dark:bg-slate-950 dark:border-none">
            <div className="flex items-center justify-between px-6 py-4 pb-0">
              <h2 className="flex flex-row text-slate-800 dark:text-slate-100 font-semibold text-sm xl:text-base  items-center gap-2">
                <Breadcrumb />
                {title}
              </h2>
              <span
                className="px-3 py-0.5 xl:py-1
                              rounded-full
                              bg-green-100
                              text-green-700
                               text-[10px] xl:text-xs
                              font-semibold dark:bg-emerald-900/40 dark:text-emerald-400"
              >
                Total: {tableQueryParams?.totalItems || 0}
              </span>
            </div>
            <TableToolbar
              txtToBeSearched={txtToBeSearched}
              setTextToBeSearched={setTxtToBeSearched}
              tableQueryParams={tableQueryParams}
              handleRowsPerPageChange={handleRowsPerPageChange}
              openFilterModal={openFilterModal}
              openSortModal={openSortModal}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              bulkAction={bulkAction}
              selectedRow={selectedRow}
              handleOnChange={handleOnChange}
              downloading={downloading}
              ref={ref}
              listSize={list.length}
            />
            {!isError ? (
              <div className="flex flex-col justify-center">
                <DesktopTable
                  list={list}
                  headersData={headersData}
                  columnsData={columnsData}
                  handleSort={handleSort}
                  getSortIcon={getSortIcon}
                  rowsPerPage={rowsPerPage}
                  tableQueryParams={tableQueryParams}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                  handleOnChange={handleOnChange}
                  ref={ref}
                />
                <MobileTable
                  rowsPerPage={rowsPerPage}
                  list={list}
                  columnsData={columnsData}
                  tableQueryParams={tableQueryParams}
                  selectedRow={selectedRow}
                  setSelectedRow={setSelectedRow}
                  handleOnChange={handleOnChange}
                />
              </div>
            ) : (
              <ErrorPage refetchAll={() => refetch?.()} />
            )}
          </div>
        </div>
      ) : (
        <EmployeeTableSkeleton />
      )}
      <div
        className={`transition-opacity duration-300 absolute inset-0 z-30 ${showModal ? ' opacity-100' : ' opacity-0 pointer-events-none'}`}
      >
        {
          <FilterModal
            closeModal={closeModal}
            submitFilterData={submitFilterData}
            clearAllFilter={clearAllFilter}
            tableQueryParams={tableQueryParams}
            setQuery={setQuery}
          />
        }
      </div>
      <div
        className={`transition-opacity duration-300 absolute inset-0 z-30 ${showSortModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        {
          <SortModalComponent
            closeSortModal={closeSortModal}
            headersData={headersData}
            onSort={(key: string) => handleSort(key)}
            sortConfig={{
              key: tableQueryParams.sortBy as string,
              direction: tableQueryParams.order as string,
            }}
          />
        }
      </div>
    </>
  );
}
const MemoizedCustomTable = React.memo(CustomTable) as <T extends ListType>(
  props: CustomTableProps<T>
) => React.ReactElement;
export default MemoizedCustomTable;
