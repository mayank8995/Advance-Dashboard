import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import {
  useAnalyticsData,
  useGetData,
  usePerformanceCardData,
} from '../../services/utils.service';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';

function Home() {
  // Queries

  const { isLoading: userLoading, error: userError } = useGetData();
  const { isLoading: performanceDataLoading, error: performanceCardError } =
    usePerformanceCardData();
  const { isLoading: analyticsDataLoading, error: analyticsDataError } =
    useAnalyticsData();
  // Fires every single time the route path changes
  const location = useLocation();
  const [isVisualLoading, setIsVisualLoading] = useState(false);

  useEffect(() => {
    // Trigger your global visual loading/spinner progress bar here
    setIsVisualLoading(true);

    const timer = setTimeout(() => setIsVisualLoading(false), 300); // smooth transition out
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    console.log('Localstirage>>>', localStorage.getItem('theme'));
    if (localStorage.getItem('theme') === 'dark') {
      root.setAttribute('data-theme', 'dark');
    }
    // console.log("combinedResponse>>>>",combinedResponse)
  }, []);

  if (userError || performanceCardError || analyticsDataError)
    return <>Error occurred...</>;

  return (
    <ErrorBoundary fallback={<div>Failed to load</div>}>
      <div className="md:flex md:flex-col md:h-full bg-slate-100">
        <Header />
        <div
          style={{
            background: `linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f5f3ff 100%)`,
          }}
          className=" bg-amber-50 flex-col md:flex md:flex-row md:flex-1 h-full md:overflow-hidden dark:bg-gray-800"
        >
          <Navigation />
          <div className="flex-1 overflow-y-auto dark:bg-gray-800">
            {isVisualLoading ||
            userLoading ||
            performanceDataLoading ||
            analyticsDataLoading ? (
              <div className="md:flex md:flex-col md:h-full bg-slate-100">
                <Puff
                  visible={true}
                  height="80"
                  width="80"
                  color="#4F46E5"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass="flex items-center justify-center min-h-screen"
                />
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </ErrorBoundary>
  );
}

export default Home;
