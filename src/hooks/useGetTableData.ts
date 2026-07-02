import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { headers_filters_employees, headers_filters_promotedThisYear, headers_filters_requiringReview, headers_filters_top_performers, headers_filters_top_projects, VIEW_MORE_ROUTES } from '../utils/constants';
import { getTopProjects } from '../services/utils.service';



export function useGetTableData() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  let data: any;
  let headers: any;

  function getAllData(){
      const target = searchParams?.get("target");
      if(searchParams && target === VIEW_MORE_ROUTES.top_projects){
          const {data: cachedData}: any = queryClient.getQueryData(['employeesData']);
              data = getTopProjects(cachedData?.employeeList?.[0]?.employees);
              headers = headers_filters_top_projects;

      }else if(searchParams && target === VIEW_MORE_ROUTES.top_performers){
          const {data: cachedData}: any = queryClient.getQueryData(['performanceCardsData']);
              data = cachedData?.topPerformers?.employees;
              headers = headers_filters_top_performers;

      }else if(searchParams && target === VIEW_MORE_ROUTES.promotedThisYear){
          const {data: cachedData}: any = queryClient.getQueryData(['performanceCardsData']);
          data = cachedData?.promotedThisYear?.employees;
              headers = headers_filters_promotedThisYear;

      }else if(searchParams && target === VIEW_MORE_ROUTES.requiringReview){
          const {data: cachedData}: any = queryClient.getQueryData(['performanceCardsData']);
          data = cachedData?.requiringReview?.employees;
              headers = headers_filters_requiringReview;

      }else{
        const {data: cachedData}: any = queryClient.getQueryData(['employeesData']);
              data = cachedData?.employeeList?.[0]?.employees;
              headers = headers_filters_employees;
              
      }
      return  { data, headers };
  }

  return { getAllData };
}
