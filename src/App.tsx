import { useState } from 'react';
import './App.css';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { CheckCircle } from 'lucide-react';
import ErrorBoundary from './components/Error/ErrorBoundary';
import ErrorBoundaryPage from './components/Error/ErrorBoundaryPage';
import { useTheme } from './hooks/useTheme';

function App() {
  const [show, setShow] = useState<boolean>(true);
  const { theme } = useTheme();
  const root = document.documentElement;
  if (localStorage.getItem('theme') === 'dark') {
    root.setAttribute('data-theme', 'dark');
  }

  return (
    <ErrorBoundary fallback={<ErrorBoundaryPage />}>
      <div className="h-screen max-h-full relative">
        <div className={` w-full px-4 `}>
          {/* {show ? <Login onCustomEvent={(flag:boolean) => setShow(flag)}/> : <Signup onCustomEvent={() => setShow((flag) => !flag)}/>} */}
          <div
            className={`relative z-10 h-screen  flex flex-1 flex-col md:flex-row justify-center items-center transition-opacity duration-300`}
          >
            <div className="hidden md:flex flex-col justify-center gap-6 p-12">
              <div className="flex items-center gap-2">
                <div className="w-15 h-15 rounded-lg ">
                  <img
                    fetchPriority="high"
                    src={
                      theme === 'dark'
                        ? '/admin_portal_logo.svg'
                        : '/admin_portal_logo_light.svg'
                    }
                    className="object-cover"
                    alt="admin portal logo"
                  />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  Admin Portal
                </span>
              </div>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white">
                Manage your entire workforce, in one place.
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-400">
                Track performance, and analytics — all from a single dashboard.
              </p>
              <div className="flex flex-col gap-3 mt-4 ">
                {[
                  'Analytics',
                  'Employee performance tracking',
                  'Centralized directory',
                ]?.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm"
                  >
                    <CheckCircle size={16} className="text-[#534ab7]" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex md:hidden flex-col items-center mb-2">
              <div className="w-15 h-15 rounded-lg ">
                <img
                  fetchPriority="high"
                  src={
                    theme === 'dark'
                      ? '/admin_portal_logo.svg'
                      : '/admin_portal_logo_light.svg'
                  }
                  className="object-cover"
                  alt="admin portal logo"
                />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Admin Portal
              </span>
            </div>
            {show ? (
              <Login
                key={'login'}
                onCustomEvent={(flag: boolean) => setShow(flag)}
              />
            ) : (
              <Signup
                key={'signup'}
                onCustomEvent={() => setShow((flag) => !flag)}
              />
            )}
          </div>
        </div>
        <div
          className="absolute inset-0 bg-linear-to-br
        from-white via-sky-50 to-violet-100
        dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950"
        />

        <div
          className="absolute bottom-0 right-0 w-2/3 h-2/3
        bg-violet-500/15
        dark:bg-violet-500/20
        blur-3xl rounded-full"
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
