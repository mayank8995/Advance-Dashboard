/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import CustomTable from '../EditableTable/CustomTable';
import { useSearchParams } from 'react-router-dom';
import { useTableData } from '../../services/utils.service';
import {
  DEFAULT_TABLE_QUERY_PARAMS,
  TABLE_CONFIG,
} from '../../utils/constants';
import type {
  TopProjectEmployeeResponse,
  TableQueryParams,
} from '../../types/types';
import { useLoader } from '../../context/Loadercontext';

function ViewMore() {
  const { setIsLoading } = useLoader();
  const [signal, setSignal] = useState<AbortSignal>();

  const [searchParams] = useSearchParams();
  const target = searchParams?.get('target');
  const config = TABLE_CONFIG[target as string];
  const [query, setQuery] = useState<TableQueryParams>(
    DEFAULT_TABLE_QUERY_PARAMS
  );
  const tableQuery = useTableData(
    { ...query, tableType: target as string },
    setIsLoading,
    signal
  );
  const list =
    (tableQuery?.data?.['data'] as TopProjectEmployeeResponse)?.['employees'] ||
    [];
  function handleTableQuery(queryData: TableQueryParams, signal?: AbortSignal) {
    setQuery((prev) => ({
      ...prev,
      ...queryData,
      tableType: target as string,
    }));
    setSignal(signal);
  }
  return (
    <CustomTable
      handleTableQuery={handleTableQuery}
      list={list || []}
      tableQueryParams={
        (tableQuery?.data?.['data'] as TopProjectEmployeeResponse)?.[
          'pagination'
        ] || DEFAULT_TABLE_QUERY_PARAMS
      }
      setQuery={setQuery}
      columnsData={config.columns || []}
      headersData={config.headers || []}
      title={
        config.title ||
        (tableQuery?.data?.['data'] as TopProjectEmployeeResponse)?.title
      }
      isError={tableQuery?.isError}
      isLoading={tableQuery?.isLoading}
      refetch={tableQuery?.refetch}
    />
  );
}
export default ViewMore;
