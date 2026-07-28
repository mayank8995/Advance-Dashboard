import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import { useAllData } from '../../services/utils.service';
import ErrorBoundary from '../Error/ErrorBoundary';
import { useEffect } from 'react';
import ErrorPage from '../Error/ErrorPage';
import Skeleton from '../Skeleton/Skeleton';

function Home() {
  // Queries
  const results = useAllData();
  const isLoading = results.some((query) => query.isLoading);
  const isError = results.some((query) => query.isError);
  const refetchAll = () => {
    results.forEach((result) => result.refetch());
  };
  useEffect(() => {
    const root = document.documentElement;
    if (localStorage.getItem('theme') === 'dark') {
      root.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <ErrorBoundary fallback={<ErrorPage refetchAll={refetchAll} />}>
      <div className="md:flex md:flex-col md:h-full bg-slate-100">
        <Header />
        <div
          style={{
            background: `linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f5f3ff 100%)`,
          }}
          className=" bg-amber-50 flex-col md:flex md:flex-row md:flex-1 h-full md:overflow-hidden dark:bg-gray-800"
        >
          <Navigation />
          {!isLoading ? (
            <div className="flex-1 overflow-y-auto dark:bg-gray-800">
              {!isError ? (
                <Outlet />
              ) : (
                <div className="flex flex-col flex-1 h-screen overflow-y-auto justify-center items-center dark:bg-gray-800">
                  <ErrorPage refetchAll={refetchAll} />{' '}
                </div>
              )}
            </div>
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
