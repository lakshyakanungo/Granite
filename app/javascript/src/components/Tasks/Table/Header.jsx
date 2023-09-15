import React from "react";

const Header = () => (
  <thead>
    <tr>
      <th className="w-1" />
      <th
        className="px-6 py-3 text-xs font-bold leading-4 tracking-wider
        text-left text-bb-gray-600 text-opacity-50 uppercase bg-gray-50"
      >
        Title
      </th>
      <th
        className="px-6 py-3 text-sm font-bold leading-4 tracking-wider
        text-left text-bb-gray-600 text-opacity-50 bg-gray-50"
      >
        Assigned To
      </th>
      <th className="px-6 py-3 bg-gray-50" />
    </tr>
  </thead>
);

export default Header;
