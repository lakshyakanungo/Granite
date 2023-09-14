import React from "react";

import { Link } from "react-router-dom";

const NavItem = ({ iconClass, name, path }) => (
  <Link
    to={path}
    className="inline-flex items-center px-1 pt-1 mr-3
      font-semibold text-sm leading-5
      text-indigo-500 hover:text-indigo-500"
  >
    {iconClass && <i className={`${iconClass} text-bb-purple`} />}
    {name}
  </Link>
);

export default NavItem;
