import {
  FileBadge,
  Group,
  LineChart,
  Package,
  UserCircleIcon,
  Users,
} from "lucide-react";

import logo from "@/assets/BeingVakil.png";
import { useLocation, useNavigate } from "react-router-dom";
import { UserStore } from "@/pages/HomeLayout/UserStore";

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const User = UserStore((state) => state.user?.userRole);
  const list = [
    {
      title: "Dashboard",
      icon: <Package className="h-5 w-5" />,
      link: "/",
    },
    {
      title: "Case and Service Management",
      icon: <FileBadge className="h-6 w-6" />,
      link: "/case-and-service-management",
    },
    {
      title: "User Management",
      icon: <Users className="h-5 w-5" />,
      link: "/user-management",
      isHidden: User !== "ADMIN",
    },
    {
      title: "Support",
      icon: <UserCircleIcon className="h-5 w-5" />,
      link: "/support",
    },
    {
      title: User === "CUSTOMER" ? "EDUCATE" : "CMS",
      icon: <Group className="h-5 w-5" />,
      link: "/cms",
    },
  ];
  return (
    <div className="hidden border-r bg-dark md:block">
      <div className="flex h-full  max-h-screen flex-col gap-2">
        <div className="flex items-center justify-center  -mt-4  px-4  lg:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="flex-1 -mt-8">
          <nav className="grid items-start gap-4 px-2 text-sm lg:px-4">
            {list.map((item) => (
              <a
                key={item.title}
                className={`flex items-center cursor-pointer text-neutral-300 gap-3 rounded-lg px-3 py-2 ${
                  pathname === item.link
                    ? "bg-primary"
                    : " transition-all hover:text-primary"
                } ${item.isHidden ? "hidden" : ""}`}
                onClick={() => navigate(item.link)}
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4"></div>
      </div>
    </div>
  );
};
