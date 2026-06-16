import { NavLink, useLocation, useMatches } from "react-router-dom";
import { StepBack } from "lucide-react";

export default function Breadcrumb() {
  
    const location = useLocation();
//   console.log(matches,"location.pathname>>>>",location);

  return <> 
    {location.pathname.includes("/viewmore") && 
          <span className="pr-2">
            <NavLink
              to={"/home/dashboard"}
               >
              <StepBack   />
            </NavLink>
          </span>

    }
    </>
  
}

// import { Link, NavLink, useLocation, useMatches } from "react-router-dom";
// import { ArrowLeft, ChevronRight } from "lucide-react";

// export default function Breadcrumb() {
  
//     const location = useLocation();
//     const matches = useMatches();
//   console.log(matches,"<<<<<<<<location.pathname>>>>",location);

//   return (
//      <div className="flex items-center gap-2 text-sm">
//       {matches
//         .filter((match:any) => match.handle?.breadcrumb)
//         .map((match:any, i: number, arr: any) => (
//           <span key={match.id} className="flex items-center gap-2">
//             {i < arr.length - 1 ? (
//               <Link to={match.pathname} className="text-slate-400 hover:text-white">
//                 {match.handle.breadcrumb}
//               </Link>
//             ) : (
//               <span className="text-white">{match.handle.breadcrumb}</span>
//             )}
//             {i < arr.length - 1 && <span className="text-slate-600">/</span>}
//           </span>
//         ))}
//     </div>
//   );
// }