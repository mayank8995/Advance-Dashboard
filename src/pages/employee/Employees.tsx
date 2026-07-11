import { useEffect, useState } from 'react';
import CustomTable from '../../components/EditableTable/CustomTable';
import {
  columns_employees,
  EMPLOYEE_DIREC,
  headers_employees,
} from '../../utils/constants';
import { useTableData } from '../../services/utils.service';
import type { TableQueryParams } from '../../types/types';
import { useAuth } from '../../context/AuthContext';

function Employees() {
  // const data = useAuth();
  const [query, setQuery] = useState<TableQueryParams>({
    page: 1,
    limit: 5,
    search: '',
    sortBy: 'id',
    order: 'asc',
  });
  const { data: tableQuery } = useTableData({ ...query });

  const list = tableQuery?.['data']?.['employees'] || [];

  function handleTableQuery(queryData: TableQueryParams) {
    setQuery((prev) => ({ ...prev, ...queryData }));
  }
  return (
    <CustomTable
      handleTableQuery={handleTableQuery}
      list={list || []}
      tableQueryParams={
        tableQuery?.['data']?.['pagination'] || {
          page: 1,
          limit: 5,
          search: '',
          sortBy: 'id',
          order: 'asc',
        }
      }
      columnsData={columns_employees}
      headersData={headers_employees}
      title={EMPLOYEE_DIREC}
      setQuery={setQuery}
    />
  );
}

export default Employees;
