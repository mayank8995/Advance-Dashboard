import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

function Analytics(){
     const [data, setData] = useState([]);
     const queryClient = useQueryClient();
    useEffect(() => {
        const cachedData: any = queryClient.getQueryData(['initialAnalyticsData']);
        setData([]);
    },[])
    return(
        <>
        Analytics
        </>
    )

}

export default Analytics