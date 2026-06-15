import { NavLink, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  
    const location = useLocation();
  console.log("location.pathname>>>>",location);

  return (
    <div className="bg-white ">
      <ul className=" flex border p-2 gap-6 text-xl text-[#2E4053] items-center">
        {location.pathname.includes("/dashboard") && (
          <>
             <ChevronRight/>
            <NavLink
              to={"/home/dashboard"}
               className={({isActive}) => "text-blue-600"}
               >
              Dashboard
            </NavLink>
          </>
        )}
        {location.pathname.includes(`/viewmore`) && (
          <>
            <ChevronRight/>
            <NavLink
              to={"viewmore"}
               className={"text-gray-500"}
               onClick={(e) => e.preventDefault()}
               >
              {location?.state?.name}
            </NavLink>
          </>
        )}
      </ul>
    </div>
  );
}