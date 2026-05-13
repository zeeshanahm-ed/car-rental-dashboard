import { Link, useLocation } from 'react-router-dom';
//icons

// Helpers
import { useState, useEffect } from 'react';

//icons
import DashboardIcon from "../../../assets/icons/dashboard-icon.svg?react";
import CarIcon from "../../../assets/icons/car-icon.svg?react";
import AddBoxIcon from "../../../assets/icons/add-box-icon.svg?react";
import UserNRoleIcon from "../../../assets/icons/userNrole-icon.svg?react";


function SidebarRoutes() {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const location = useLocation();

  // Route configuration with permission mapping
  const routeConfig = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: () => <DashboardIcon />,
      path: "/",
    },
    {
      key: "cars",
      label: "Manage Cars",
      icon: () => <CarIcon />,
      path: "/manage-cars",
    },
    {
      key: "add-car",
      label: "Add Car",
      icon: () => <AddBoxIcon />,
      path: "/add-car",
    },
    {
      key: "user-management",
      label: "User Management",
      icon: () => <UserNRoleIcon />,
      path: "/user-management",
    },

  ];



  const stripQuery = (routePath: string) => routePath.split('?')[0];

  useEffect(() => {
    const currentPath = location.pathname;

    // Find the matching route based on the current path
    const matchingRoute = routeConfig.find(route => {
      const routeBase = stripQuery(route.path);
      if (routeBase === '/') {
        return currentPath === '/' || currentPath === '';
      }
      return currentPath.startsWith(routeBase);
    });

    if (matchingRoute) {
      setActiveRoute(matchingRoute.key);
    } else {
      setActiveRoute("");
    }
  }, [location.pathname]);


  return (
    <section className="h-full w-72 py-5 overflow-y-auto  overflow-x-hidden">
      <div className="flex flex-col h-full">
        <div className="flex-1 px-4">
          {routeConfig.map(({ key, label, path, icon }) => (
            <Link
              key={key}
              to={path}
              onClick={() => setActiveRoute(key)}
            >
              <div className={`h-12.5 font-medium duration-300 transition-all px-4 rounded-3xl flex items-center gap-3 text-base my-1.5
                ${activeRoute === key ? "bg-primary text-white" : "text-text-secondary hover:bg-background-hover hover:text-primary"}
              `}
              >
                {icon()}
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SidebarRoutes;
