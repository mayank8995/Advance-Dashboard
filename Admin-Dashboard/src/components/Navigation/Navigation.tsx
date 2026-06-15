import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_ITEMS, SIDE_BAR_ITEMS } from "../../utils/constants";
import { BarChart3, Home, Settings, Users } from "lucide-react";

 function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    { name: SIDE_BAR_ITEMS.DASHBOARD, path: NAV_ITEMS.DASHBOARD },
    { name: SIDE_BAR_ITEMS.EMPLOYEES, path:NAV_ITEMS.EMPLOYEES },
    { name: SIDE_BAR_ITEMS.ANALYTICS, path: NAV_ITEMS.ANALYTICS },
    { name:SIDE_BAR_ITEMS.SETTINGS, path:NAV_ITEMS.SETTINGS },
  ];

  function navigateToPage(isOpen:boolean,  navItem?: any, isMobile?:boolean){
      if(isMobile) 
        setIsOpen(!isOpen)
      else
        setIsOpen(isOpen)
      
      navItem && navigate(`${navItem.path}`)
  }
  return (
    <>
      {/* Mobile Top Bar */}
      <div className="absolute top-0 right-0 md:hidden flex items-center justify-between p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="pl-2 text-xl text-slate-800 dark:text-slate-100"
        >
          ☰
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => navigateToPage(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          bg-gradient-to-br from-slate-900 to-indigo-950
          fixed top-0 left-0 z-50 w-64  text-white
          transform transition-transform duration-300 md:shrink-0 h-full md:h-auto overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          flex-col dark:bg-gradient-to-br dark:from-slate-950  dark:to-slate-900
        `}
      >
        {/* Logo */}
        <div className="px-6 py-8 border-b border-slate-800">
  <h1 className="text-3xl font-bold text-white">
    Admin Panel
  </h1>

  <p className="text-slate-400 text-sm mt-1">
    Workforce Management
  </p>
</div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2 h-full overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => navigateToPage(false,item)}
              className={({ isActive }) =>
                `flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-slate-300
              hover:bg-slate-800
              hover:text-white
              transition-all
              ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-violet-500 rounded-xl text-white shadow-lg shadow-indigo-500/300"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {/* { `${item.name}` === SIDE_BAR_ITEMS.DASHBOARD && <Home className="h-5 w-5"/>}
              { `${item.name}` === SIDE_BAR_ITEMS.EMPLOYEES && <Users className="h-5 w-5"/>}
              { `${item.name}` === SIDE_BAR_ITEMS.ANALYTICS && <BarChart3 className="h-5 w-5"/>}
              { `${item.name}` === SIDE_BAR_ITEMS.SETTINGS && <Settings className="h-5 w-5" />} */}
              {item.name === SIDE_BAR_ITEMS.DASHBOARD && <><Home className="h-5 w-5" size={18}/>{item.name}</>}
              {item.name === SIDE_BAR_ITEMS.EMPLOYEES && <><Users className="h-5 w-5" size={18}/>{item.name}</>}
              {item.name === SIDE_BAR_ITEMS.ANALYTICS && <><BarChart3 className="h-5 w-5" size={18}/>{item.name}</>}
              {item.name === SIDE_BAR_ITEMS.SETTINGS && <><Settings className="h-5 w-5" size={18}/>{item.name}</>}

            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto p-6 border-t border-slate-800">
        <p className="text-xs text-slate-500">
          © 2026 Admin Dashboard
        </p>
      </div>
      </div>
    </>
  );
}
export default Navigation