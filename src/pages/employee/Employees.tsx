import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import CustomTable from "../../components/EditableTable/CustomTable";
import { columns_employees, EMPLOYEE_DIREC, headers_employees } from "../../utils/constants";

function Employees(){
     const [data, setData] = useState([]);
     const queryClient = useQueryClient();
    useEffect(() => {
        const {data:cachedData}: any = queryClient.getQueryData(['employeesData']);
        setData(cachedData?.employeeList?.[0]?.employees);
    },[])
    console.log("Employees data>>>>",data)
    return(
        <>
        <CustomTable  key={data?.length} list={data} columnsData={columns_employees} headersData={headers_employees} title={EMPLOYEE_DIREC} />
        {/* <CustomDataTable list={data} /> */}
        </>
    )

}

export default Employees