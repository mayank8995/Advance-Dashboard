import { NavLink, useLocation } from 'react-router-dom';
import { StepBack } from 'lucide-react';

export default function Breadcrumb() {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes('/viewmore') && (
        <span className="pr-2">
          <NavLink to={'/home/dashboard'}>
            <StepBack />
          </NavLink>
        </span>
      )}
    </>
  );
}
