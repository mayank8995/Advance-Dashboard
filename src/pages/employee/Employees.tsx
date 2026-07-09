import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CustomTable from "../../components/EditableTable/CustomTable";
import { columns_employees, EMPLOYEE_DIREC, headers_employees } from "../../utils/constants";
import { useEmployeeData } from "../../services/utils.service";
import type { Pagination, QueryParams } from "../../types/types";

function Employees(){
    const [query, setQuery] = useState<QueryParams>({page:1, limit: 5, search:""})
    const { data: paginatedData } = useEmployeeData(query);
    function handlePagination(pagination: Pagination ){
        console.log("Employees data>>>>",paginatedData?.['data'])
        setQuery({page: pagination.page, limit: pagination.limit})
    }
    return(
        <>
        <CustomTable handlePagination={handlePagination} key={paginatedData?.['data']?.['employees']?.length} employeeList = {paginatedData?.['data']} list={paginatedData?.['data']?.['employees'] || []} pageMeta={paginatedData?.['data']?.['pagination']} qParams={{page:1, limit: 5, search:""}} columnsData={columns_employees} headersData={headers_employees} title={EMPLOYEE_DIREC} />
        {/* <CustomDataTable list={data} /> */}
        </>
    )

}

export default Employees