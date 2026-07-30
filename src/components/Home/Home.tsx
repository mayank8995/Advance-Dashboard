import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import ErrorBoundary from '../Error/ErrorBoundary';
import ErrorBoundaryPage from '../Error/ErrorBoundaryPage';

function Home() {
  return (
    <ErrorBoundary fallback={<ErrorBoundaryPage />}>
      <div className="md:flex md:flex-col h-screen bg-slate-100 dark:bg-gray-800">
        <Header />
        <div className=" flex-col md:flex md:flex-row md:flex-1 h-full md:overflow-hidden dark:bg-gray-800">
          <Navigation />
          <div
            data-test="home"
            className="flex-1 overflow-y-auto dark:bg-gray-800"
          >
            <Outlet />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
