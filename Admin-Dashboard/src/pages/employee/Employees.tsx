import { useEffect, useState } from "react";
import CustomDataTable from "../../components/EditableTable/CustomDataTable"
import getEmployees from "../../api/MockApi/MockApi";

function Employees(){
     const [data, setData] = useState([]);
     useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await getEmployees();
            // const json = response.json()
            console.log(response,"employee response>>>",response?.employeeList?.[0]?.employees)
            setData(response?.employeeList?.[0]?.employees);
            } catch (error) {
            console.error(error);
            }
        };
    fetchData();
     },[])
    return(
        <>
        <CustomDataTable list={data}/>
        </>
    )

}

export default Employees