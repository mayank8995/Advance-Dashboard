import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import {
  getAnalytics,
  getTableEmployees,
  getPerformanceCards,
  getProfileData,
  getFilterList,
} from '../api/admin-portal.api';
import type { FilterList, TableQueryParams } from '../types/types';

declare global {
  interface Array<T> {
    customFilter(predicate: (item: T) => boolean, obj: any): T[];
    deepSearchCustomFilter(txtTobeSearched: string): T[];
    applyFilterOnTable(
      fliterQuery: Map<string, string | boolean | Array<T>>
    ): T[];
  }
}

// export function useGetData() {
//   return useQuery({
//     queryKey: ['employeesData'],
//     queryFn: getEmployees,
//     staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
//   });
// }
export function useFilterList(params: FilterList) {
  console.log('useFilterList', params);
  return useQuery({
    queryKey: ['filterList', params.tableType],
    queryFn: () => getFilterList(params),
    staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
  });
}

export function useTableData(
  params: TableQueryParams,
  setIsLoading: (loading: boolean) => void,
  signal?: AbortSignal
) {
  const { totalPages, totalItems, ...updatedParams } = params;

  // const reqParams = {};
  const queryParams =
    'tableType' in updatedParams
      ? updatedParams
      : { ...updatedParams, tableType: 'employees' };

  return useQuery({
    queryKey: ['employees', ...Object.values(queryParams)],
    queryFn: () => getTableEmployees(queryParams, setIsLoading, signal),
    placeholderData: keepPreviousData, // Smooth transitions,
    staleTime: Infinity,
  });
}

export function usePerFormanceTableData(params: TableQueryParams) {
  const { totalPages, totalItems, ...updatedParams } = params;
  const queryParams =
    'tableType' in updatedParams
      ? updatedParams
      : { ...updatedParams, tableType: 'employees' };

  return useQuery({
    queryKey: ['performance', ...Object.values(queryParams)],
    queryFn: () => getTableEmployees(queryParams),
    placeholderData: keepPreviousData, // Smooth transitions,
    staleTime: Infinity,
  });
}

export function useAllData() {
  return useQueries({
    queries: [
      {
        queryKey: ['analyticsData'],
        queryFn: getAnalytics,
        staleTime: Infinity,
      },
      {
        queryKey: ['performanceCardsData'],
        queryFn: getPerformanceCards,
        staleTime: Infinity,
      },
    ],
  });
}

// export function useAnalyticsData() {
//   return useQuery({
//     queryKey: ['analyticsData'],
//     queryFn: getAnalytics,
//     staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
//   });
// }

// export function usePerformanceCardData() {
//   return useQuery({
//     queryKey: ['performanceCardsData'],
//     queryFn: getPerformanceCards,
//     staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
//   });
// }

export function useProfileData() {
  return useQuery({
    queryKey: ['profileData'],
    queryFn: getProfileData,
    staleTime: Infinity, // Keep the data "fresh" forever so it doesn't re-fetch
  });
}

export function getAvgEmployeeSatisfaction(data: Array<any>) {
  let totalSum = 0;
  data?.length > 0 &&
    data?.map((value) => {
      totalSum += value?.rating || 0;
    });
  return data?.length > 0 && (totalSum / data.length).toFixed(1);
}

export function getNumberofActiveProjects(data: Array<any>) {
  let count = 0;
  data?.length > 0 &&
    data?.map((value) => {
      let projectsArr: any[] = value?.projects || [];
      for (let proj of projectsArr) {
        if (proj?.status === 'Active') count++;
      }
    });
  return count;
}

Array.prototype.customFilter = function (fn: any, obj: any) {
  const filtered = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      // console.log("obj>>>>",obj)
      const topProjectsObj = { name: obj?.manager || '', ...this[i] };
      filtered.push(topProjectsObj);
    }
  }

  return filtered;
};
export function getTopProjects(data: Array<any>) {
  let topProjectsArray: any[] = [];
  if (data && data?.length > 0) {
    for (let proj of data) {
      let filterArray = proj?.projects?.customFilter((p: any) => {
        if (p?.priorityRanking === '*') return p;
      }, proj);
      filterArray &&
        filterArray?.length &&
        topProjectsArray.push(...filterArray);
    }
  }
  // console.log("topProjectsArray>>>>>",topProjectsArray)
  return topProjectsArray;
}

export function getTop6ArrayElement(data: any) {
  const modifiedObj = {
    ...data,
    employees:
      data?.employees?.length > 5
        ? data?.employees?.slice(0, 5)
        : data?.employees,
  };
  return modifiedObj;
}

export function performDeepSearch(obj: any, target: string) {
  if (obj === null || typeof obj !== 'object') return false;
  for (const key in obj) {
    if (
      (typeof obj[key] === 'number' ||
        typeof obj[key] === 'string' ||
        typeof obj[key] === 'boolean') &&
      obj[key].toString().toLowerCase().includes(target)
    ) {
      // console.log("ZXCZXCZXCZXCZX>>")
      return true;
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const found = performDeepSearch(obj[key], target);
      if (found) return true;
    }
  }
  return false;
}

export function filterSearchInTable(
  obj: any,
  fliterQuery: Map<string, string | boolean | string[]>,
  count: number
) {
  if (obj === null || typeof obj !== 'object') return false;
  for (const key in obj) {
    if (fliterQuery.has(key)) {
      // console.log("get key>>>>",fliterQuery.get(key))
    }
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const found = filterSearchInTable(obj[key], fliterQuery, count);
      if (found) return true;
    }
  }
  if (count === fliterQuery.size) {
    return true;
  }
  return false;
}

Array.prototype.deepSearchCustomFilter = function (query: string) {
  const filtered: any[] = [];
  const cleanQuery = query.trim().replace(/\s+/g, ' ').toLowerCase();
  if (this) {
    // if(!isCustomTableFilter){
    for (let i = 0; i < this.length; i++) {
      if (this[i]) {
        if (performDeepSearch(this[i], cleanQuery)) {
          filtered.push(this[i]);
        }
      }
    }
    // console.log(filtered,"query>>>>",query)

    // }else{
    // return filteredTableData(this, tableCustomFilterData)
    // }
  }
  return filtered;
};

Array.prototype.applyFilterOnTable = function (
  fliterQuery: Map<string, string | boolean | string[]>
) {
  const filtered: any[] = [];
  if (this) {
    for (let i = 0; i < this.length; i++) {
      if (this[i]) {
        if (filterSearchInTable(this[i], fliterQuery, 0)) {
          // console.log("in if applyFilterOnTabl")
          filtered.push(this[i]);
        }
      }
    }
    // console.log("applyFilterOnTable>",filtered)
  }
  return filtered;
};

export function transformDataForFilterModalUI(relevantData: Function) {
  const { data, headers } = relevantData();
  // console.log('SADASDA', data, headers);
  const valuesMap = new Map<string, Array<string | boolean | string[]>>(
    headers
      ?.map((data: any) => data.key)
      ?.map((item: any) => [item, [] as Array<string | boolean | string[]>])
  );
  // console.log("valuesMap",valuesMap, relevantData())
  const filterSet = new Set(headers?.map((data: any) => data.key));
  // console.log("list>>>",data,FILTER_TABLE_KEY,valuesMap,filterSet)
  for (let i = 0; i < data.length; i++) {
    if (data[i]) {
      for (const key in data[i]) {
        const value = data[i][key];

        if (
          typeof value === 'boolean' ||
          typeof value === 'string' ||
          Array.isArray(value)
        ) {
          if (filterSet.has(key)) {
            if (valuesMap.has(key)) {
              const content = valuesMap.get(key);
              if (Array.isArray(value)) {
                console.log('iniased>>>', value);

                const val = valuesMap.get(key) as string[];
                const newSet = new Set([...val, ...value]);
                valuesMap.set(key, [...newSet]);
              } else {
                console.log('content>>>', content);

                if (!content?.includes(value)) {
                  valuesMap.get(key)?.push(value);
                }
              }
            } else {
              !Array.isArray(value)
                ? valuesMap.set(key, [value])
                : valuesMap.set(key, [...value]);
            }
          }
        }
      }
    }
  }

  // console.log('valuesMap>>>>>', valuesMap);
  return valuesMap;
}

export function deepCloneCustom(obj: any) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());

  const newObject: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObject[key] = deepCloneCustom(obj[key]);
    }
  }
  return newObject;
}

export function filteredTableData(searchList: any, queryList: any) {
  const filteredArray = [];
  let flag = 1;
  for (const item of searchList) {
    flag = 1;
    for (let [key, value] of queryList) {
      if (value.length === 0) continue;
      if (Array.isArray(item[key])) {
        // to be coded for array
        // console.log(item[key])
        const match = value.filter((it: string) => item[key].includes(it));
        if (match.length === 0) {
          flag = 0;
          break;
        }
      } else {
        if (!value.includes(item[key])) {
          flag = 0;
          break;
        }
      }
    }
    flag && filteredArray.push(item);
  }
  // console.log("filteredArray>>>>",filteredArray)
  return filteredArray;
}
