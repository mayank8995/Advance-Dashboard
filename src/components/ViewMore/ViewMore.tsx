import { useState } from 'react';
import CustomTable from '../EditableTable/CustomTable';
import { useSearchParams } from 'react-router-dom';
import { useTableData } from '../../services/utils.service';
import {
  DEFAULT_TABLE_QUERY_PARAMS,
  TABLE_CONFIG,
} from '../../utils/constants';
import type { TableQueryParams } from '../../types/types';
import { useLoader } from '../../context/Loadercontext';

function ViewMore() {
  const { setIsLoading } = useLoader();

  const [searchParams] = useSearchParams();
  const target = searchParams?.get('target');
  const config = TABLE_CONFIG[target as string];
  const [query, setQuery] = useState<TableQueryParams>(
    DEFAULT_TABLE_QUERY_PARAMS
  );
  const tableQuery = useTableData(
    { ...query, tableType: target as string },
    setIsLoading
  );
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
        tableQuery?.data?.['data']?.['pagination'] || DEFAULT_TABLE_QUERY_PARAMS
      }
      setQuery={setQuery}
      columnsData={config.columns || []}
      headersData={config.headers || []}
      title={config.title || tableQuery?.data?.['data']?.title}
    />
  );
}
export default ViewMore;
