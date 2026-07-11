import { useState } from 'react';
import CustomTable from '../EditableTable/CustomTable';
import { useSearchParams } from 'react-router-dom';
import { useTableData } from '../../services/utils.service';
import { TABLE_CONFIG } from '../../utils/constants';
import type { TableQueryParams } from '../../types/types';

function ViewMore() {
  const [searchParams] = useSearchParams();
  const target = searchParams?.get('target');
  const config = TABLE_CONFIG[target as string];
  const [query, setQuery] = useState<TableQueryParams>({
    page: 1,
    limit: 5,
    search: '',
    sortBy: 'id',
    order: 'asc',
  });
  const tableQuery = useTableData({ ...query, tableType: target as string });
  const list = tableQuery?.data?.['data']?.['employees'] || [];
  function handleTableQuery(queryData: TableQueryParams) {
    setQuery((prev) => ({
      ...prev,
      ...queryData,
      tableType: target as string,
    }));
  }
  return (
    <CustomTable
      handleTableQuery={handleTableQuery}
      list={list || []}
      tableQueryParams={
        tableQuery?.data?.['data']?.['pagination'] || {
          page: 1,
          limit: 5,
          search: '',
          sortBy: 'id',
          order: 'asc',
        }
      }
      columnsData={config.columns || []}
      headersData={config.headers || []}
      title={config.title || tableQuery?.data?.['data']?.title}
    />
  );
}
export default ViewMore;
