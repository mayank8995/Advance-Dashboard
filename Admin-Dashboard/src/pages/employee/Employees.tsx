import { useEffect, useState } from "react";
import CustomDataTable from "../../components/EditableTable/CustomDataTable"
import { useQueryClient } from "@tanstack/react-query";

function Employees(){
     const [data, setData] = useState([]);
     const queryClient = useQueryClient();
    useEffect(() => {
        const cachedData: any = queryClient.getQueryData(['initialAppData']);
        setData(cachedData?.employeeList?.[0]?.employees);
    },[])
    return(
        <>
        <CustomDataTable list={data}/>
        </>
    )

}

export default Employees