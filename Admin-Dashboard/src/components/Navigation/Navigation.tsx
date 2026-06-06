import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

 function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navItems = [
    { name: "Dashboard", path: "/home/dashboard" },
    { name: "Employees", path: "/home/employees" },
    { name: "Analytics", path: "/home/analytics" },
    { name: "Settings", path: "/home/settings" },
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
      <div className="md:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold">Admin</h1>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl"
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
          fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-white
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          flex-col
        `}
      >
        {/* Logo */}
        <div className="text-2xl font-bold p-6 border-b border-gray-700">
          Admin Panel
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => navigateToPage(false,item)}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 text-sm text-gray-400">
          © 2026 Admin Dashboard
        </div>
      </div>
    </>
  );
}
export default Navigation