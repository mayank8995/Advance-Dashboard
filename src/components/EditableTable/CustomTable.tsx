import { ArrowDown, ArrowUp, ArrowUpDown, TextSearch } from 'lucide-react';
import { useState, useEffect } from 'react';
import MobileViewCardForTable from './MobileViewCardForTable';
import Breadcrumb from '../Breadcrumbs/Breadcrumbs';
import { NO_RESULT_FOUND } from '../../utils/constants';
import { useQueryClient } from '@tanstack/react-query';
import FilterModal from '../FilterComponent/FilterModal';
import SortModalComponent from '../SortModal/SortModalComponent';
import TableToolbar from './TableToolbar';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';

export default function CustomTable({
  list,
  tableQueryParams,
  handleTableQuery,
  columnsData,
  headersData,
  title,
}: any) {
  const queryClient = useQueryClient();
  const [txtToBeSearched, setTextToBeSearched] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [tableCustomFilterData, setTableCustomFilterData] = useState(
    queryClient.getQueryData(['filterKeyData']) || new Map()
  );
  const [showSortModal, setSortShowModal] = useState(false);

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
    const timerId = setTimeout(() => {
      handleTableQuery({
        ...tableQueryParams,
        page: 1,
        search: txtToBeSearched,
      });
    }, 300);
    return () => clearTimeout(timerId);
  }, [txtToBeSearched]);

  // Handler functions
  const handleSort = (key: any) => {
    let direction = 'asc';
    if (tableQueryParams.sortBy === key && tableQueryParams.order === 'asc') {
      direction = 'desc';
    }
    handleTableQuery({
      ...tableQueryParams,
      page: 1,
      sortBy: key,
      order: direction,
    });
  };

  const handleRowsPerPageChange = (e: any) => {
    handleTableQuery({
      ...tableQueryParams,
      page: 1,
      limit: Number(e?.target?.value),
    });
  };

  const getSortIcon = (key: any) => {
    if (tableQueryParams.sortBy !== key)
      return (
        <ArrowUpDown className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:hover:text-indigo-400" />
      );
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
    setSortShowModal(true);
    queryClient.setQueryData(['opensortmodal'], true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeSortModal = () => {
    setSortShowModal(false);
  };

  const submitFilterData = (data: any) => {
    console.log('In here customtable!!!!!', data);
    queryClient.setQueryData(['filterKeyData'], data);
    const hashMap = new Map(data.map((obj: any) => [obj.key, obj.value]));
    setTableCustomFilterData(hashMap);
    closeModal();
  };

  const clearAllFilter = () => {
    queryClient.removeQueries({ queryKey: ['filterKeyData'], exact: true });
    setTableCustomFilterData(new Map());
    handleTableQuery({ ...tableQueryParams, page: 1 });
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 p-4 dark:bg-gray-800">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 flex-1 overflow-x-auto dark:bg-slate-950 dark:border-none">
          <div className="flex items-center justify-between px-6 py-4 pb-0">
            <h2 className="flex flex-row text-slate-800 dark:text-slate-100 font-semibold text-base  items-center gap-2">
              <Breadcrumb />
              {title}
            </h2>
            <span
              className="px-3 py-1
                              rounded-full
                              bg-green-100
                              text-green-700
                               text-xs
                              font-semibold dark:bg-emerald-900/40 dark:text-emerald-400"
            >
              Total: {tableQueryParams?.totalItems || 0}
            </span>
          </div>
          <TableToolbar
            txtToBeSearched={txtToBeSearched}
            setTextToBeSearched={setTextToBeSearched}
            tableQueryParams={tableQueryParams}
            handleRowsPerPageChange={handleRowsPerPageChange}
            tableCustomFilterData={tableCustomFilterData}
            openFilterModal={openFilterModal}
            openSortModal={openSortModal}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
          <div className="flex flex-col justify-center">
            <DesktopTable
              list={list}
              headersData={headersData}
              columnsData={columnsData}
              handleSort={handleSort}
              getSortIcon={getSortIcon}
            />
            <MobileTable list={list} headersData={headersData} />
          </div>
        </div>
      </div>
      <div
        className={`transition-opacity duration-400 ${showModal ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
      >
        {
          <FilterModal
            closeModal={closeModal}
            submitFilterData={submitFilterData}
            clearAllFilter={clearAllFilter}
          />
        }
      </div>
      <div
        className={`transition-opacity duration-400 ${showSortModal ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
      >
        {
          <SortModalComponent
            closeSortModal={closeSortModal}
            headersData={headersData}
            onSort={(key?: string) => handleSort(key)}
            sortConfig={{
              key: tableQueryParams.sortBy,
              direction: tableQueryParams.order,
            }}
          />
        }
      </div>
    </>
  );
}
