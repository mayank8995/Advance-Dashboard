import { useQuery } from "@tanstack/react-query";
import getEmployees, { getAnalytics } from "../api/MockApi/MockApi";

export function useGetData(){
    return useQuery({
                queryKey: ['initialAppData'],
                queryFn: getEmployees,
                staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
  });
}
export function useAnalyticsData(){
    return useQuery({
                queryKey: ['initialAnalyticsData'],
                queryFn: getAnalytics,
                staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
  });
}

export function getAvgEmployeeSatisfaction(data: Array<any>){
    let totalSum = 0;
    data?.length > 0 && data.map((value) =>{
             totalSum += value?.rating || 0
    })
    return data.length > 0 && (totalSum / data.length).toFixed(1)

}

export function getNumberofActiveProjects(data: Array<any>){
    let count = 0;
    data?.length > 0 && data.map((value) =>{
        let projectsArr:any[] = value?.projects || []
            for(let proj of projectsArr){
                if(proj?.status === 'Active') count++;
            }
    })
    return count;
}

export function getTopProjects(data: Array<any>){
             for(let proj of data){
                    if(proj?.priorityRanking === "*"){
                         return proj;
                    }
            }
}