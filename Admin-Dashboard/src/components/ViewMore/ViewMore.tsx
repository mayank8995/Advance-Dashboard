import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CustomTable from "../EditableTable/CustomTable";
import { useSearchParams } from "react-router-dom";
import { getTopProjects } from "../../utils/Utils";
import { columns_promotedThisYear, columns_requiringReview, columns_top_performers, columns_top_projects, headers_promotedThisYear, headers_requiringReview, headers_top_performers, headers_top_projects, TOP_PROJECTS, VIEW_MORE_ROUTES } from "../../utils/constants";

function ViewMore(){
    const [data, setData] = useState<any>([]);
    const [columnsData, setcolumnsData] = useState({});
    const [headersData, setheadersData] = useState<any>([]);
    const [title, setTitle] = useState<any>([]);
    const [searchParams] = useSearchParams();
     const queryClient = useQueryClient();
     const cachedData: any = queryClient.getQueryData(['initialAppData']);
     const otherData: any = queryClient.getQueryData(['initialPerformanceCardsData']);

    useEffect(() => {
        const target = searchParams?.get("target");
        if(searchParams && target === VIEW_MORE_ROUTES.top_projects){
            setData(getTopProjects(cachedData?.employeeList?.[0]?.employees));
            setheadersData(headers_top_projects)
            setcolumnsData(columns_top_projects)
            setTitle(TOP_PROJECTS)
        }else if(searchParams && target === VIEW_MORE_ROUTES.top_performers){
            setData(otherData?.topPerformers?.employees)
            setheadersData(headers_top_performers)
            setcolumnsData(columns_top_performers)
            setTitle(otherData?.topPerformers?.title)
        }else if(searchParams && target === VIEW_MORE_ROUTES.promotedThisYear){
            setData(otherData?.promotedThisYear?.employees)
            setheadersData(headers_promotedThisYear)
            setcolumnsData(columns_promotedThisYear)
            setTitle(otherData?.promotedThisYear?.title)
        }else if(searchParams && target === VIEW_MORE_ROUTES.requiringReview){
            setData(otherData?.requiringReview?.employees)
            setheadersData(headers_requiringReview)
            setcolumnsData(columns_requiringReview)
            setTitle(otherData?.requiringReview?.title)
        }
    },[])

    return(
        <CustomTable list={data} columnsData={columnsData} headersData={headersData} title={title} />
    )

}
export default ViewMore;