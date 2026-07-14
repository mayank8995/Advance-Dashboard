import { useState } from 'react';
import CustomTable from '../../components/EditableTable/CustomTable';
import {
  columns_employees,
  DEFAULT_TABLE_QUERY_PARAMS,
  EMPLOYEE_DIREC,
  headers_employees,
} from '../../utils/constants';
import { useTableData } from '../../services/utils.service';
import type { TableQueryParams } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';

function Employees() {
  const { setIsLoading } = useLoader();

  const [query, setQuery] = useState<TableQueryParams>(
    DEFAULT_TABLE_QUERY_PARAMS
  );
  const { data: tableQuery } = useTableData({ ...query }, setIsLoading);

  const list = tableQuery?.['data']?.['employees'] || [];

  function handleTableQuery(queryData: TableQueryParams) {
    setQuery((prev) => ({ ...prev, ...queryData }));
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
