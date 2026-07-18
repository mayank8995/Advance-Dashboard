import { useState } from 'react';
import CustomTable from '../../components/EditableTable/CustomTable';
import {
  DEFAULT_TABLE_QUERY_PARAMS,
  EMPLOYEE_DIREC,
  headers_employees,
} from '../../utils/constants';
import { useTableData } from '../../services/utils.service';
import type { TableQueryParams } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';
import { columns_employees } from '../../components/EditableTable/CustomCellRenderer';

function Employees() {
  const { setIsLoading } = useLoader();
  const [signal, setSignal] = useState<AbortSignal>();

  const [query, setQuery] = useState<TableQueryParams>(
    DEFAULT_TABLE_QUERY_PARAMS
  );
  const { data: tableQuery } = useTableData({ ...query }, setIsLoading, signal);

  const list = tableQuery?.['data']?.['employees'] || [];

  function handleTableQuery(queryData: TableQueryParams, signal?: AbortSignal) {
    setQuery((prev) => ({ ...prev, ...queryData }));
    setSignal(signal);
  }
  return (
    <CustomTable
      handleTableQuery={handleTableQuery}
      list={list || []}
      tableQueryParams={
        tableQuery?.['data']?.['pagination'] || DEFAULT_TABLE_QUERY_PARAMS
      }
      columnsData={columns_employees}
      headersData={headers_employees}
      title={EMPLOYEE_DIREC}
      setQuery={setQuery}
    />
  );
}

export default Employees;
