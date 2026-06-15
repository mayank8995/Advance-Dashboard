import { useQuery } from "@tanstack/react-query";
import getEmployees, { getAnalytics, getPerformanceCards } from "../api/MockApi/MockApi";

declare global {
  interface Array<T> {
    customFilter(predicate: (item: T) => boolean, obj:any): T[];
    deepSearchCustomFilter(txtTobeSearched: string): T[];
  }
}

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

export function usePerformanceCardData(){
    return useQuery({
                queryKey: ['initialPerformanceCardsData'],
                queryFn: getPerformanceCards,
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

Array.prototype.customFilter = function (fn:any, obj:any) {
  const filtered = []; // it will receive all values that match to condition passed in fn callback.
    for (let i = 0; i < this.length; i++) {
            if (fn(this[i])) {
                const topProjectsObj = {name:obj?.manager || "",...this[i]}
                filtered.push(topProjectsObj);
            }
    }

  return filtered;
};
export function getTopProjects(data: Array<any>){
    let topProjectsArray:any[] = [];
    if(data && data?.length > 0){
        for(let proj of data){
          let filterArray =  proj?.projects?.customFilter((p:any) => {
            if(p?.priorityRanking === "*") return p;
           },proj);
           filterArray && filterArray?.length && topProjectsArray.push(...filterArray)

        }
    }
    return topProjectsArray;
}

export function getTop6ArrayElement(data: any){
    const modifiedObj = { ...data, "employees": data?.employees?.length > 5 ? data?.employees?.slice(0,5) : data?.employees}
    return modifiedObj;
}
export function setWidthAsperPercentage(percentage:any){
    return ``
}

export function performDeepSearch(obj:any, target:string) {
  for (let key in obj) {
    if (obj[key]?.toString()?.toLowerCase()?.includes(target)) return true;
    // If the property is an object, look inside it recursively
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (performDeepSearch(obj[key], target)) return true;
    }
  }
  return false;
}

Array.prototype.deepSearchCustomFilter = function(txtTobeSearched: string){
  const filtered: any[] = [];
  if(this){
    console.table("this>>>",this)
      for(let i=0;i<this.length;i++){
        if(this[i]){
          if(performDeepSearch(this[i], txtTobeSearched)){
            filtered.push(this[i]);
          }
        }
      }
  }
  return filtered;
}