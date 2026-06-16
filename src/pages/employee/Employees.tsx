import { useEffect, useState } from "react";
import CustomDataTable from "../../components/EditableTable/CustomDataTable"
import { useQueryClient } from "@tanstack/react-query";
import CustomTable from "../../components/EditableTable/CustomTable";
import { columns_employees, columns_top_projects, EMPLOYEE_DIREC, headers_employees, headers_top_projects } from "../../utils/constants";

function Employees(){
     const [data, setData] = useState([]);
     const queryClient = useQueryClient();
    useEffect(() => {
        const cachedData: any = queryClient.getQueryData(['initialAppData']);
        setData(cachedData?.employeeList?.[0]?.employees);
    },[])
    return(
        <>
        <CustomTable list={data} columnsData={columns_employees} headersData={headers_employees} title={EMPLOYEE_DIREC} />
        {/* <CustomDataTable list={data} /> */}
        </>
    )

}

export default Employees