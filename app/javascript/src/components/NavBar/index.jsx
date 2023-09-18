import React from "react";

import { Link } from "react-router-dom/cjs/react-router-dom";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "utils/storage";

import NavItem from "./NavItem";

const NavBar = () => {
  const userName = getFromLocalStorage("authUserName");
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Todos" path="/dashboard" />
              <NavItem
                iconClass="ri-add-fill"
                name="Add"
                path="/tasks/create"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4">
            <span
              className="inline-flex items-center px-2 pt-1 text-sm
              font-regular leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent focus:outline-none
              focus:text-bb-gray-700"
            >
              <Link to="/my/preferences">Preferences </Link>
            </span>
            <span
              className="inline-flex items-center px-2 pt-1 text-sm
              font-regular leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent focus:outline-none
              focus:text-bb-gray-700"
            >
              {userName}
            </span>
            <a
              className="inline-flex items-center px-1 pt-1 text-sm
              font-semibold leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
              onClick={handleLogout}
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
