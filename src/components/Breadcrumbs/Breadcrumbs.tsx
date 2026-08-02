import { NavLink, useLocation } from 'react-router-dom';
import { StepBack } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes('/viewmore') && (
        <NavLink to={'/home/dashboard'}>
          <StepBack className="h-5 w-5 xl:h-6 xl:w-6 text-slate-800 dark:text-slate-100" />
        </NavLink>
      )}
    </>
  );
}
