import React from "react";

import PropTypes from "prop-types";

import Tooltip from "components/Tooltip";

const Row = ({ data, showTask }) => (
  <tbody className="bg-white divide-y divide-gray-200">
    {data.map(rowData => (
      <tr key={rowData.id}>
        <td
          className="block w-64 px-6 py-4 text-sm font-medium
            leading-8 text-bb-purple capitalize truncate"
        >
          <Tooltip content={rowData.title} delay={200} direction="top">
            <div className="truncate max-w-64 ">{rowData.title}</div>
          </Tooltip>
        </td>
        <td className="px-6 py-4 text-sm font-medium leading-5 text-right cursor-pointer">
          <a className="text-bb-purple" onClick={() => showTask(rowData.slug)}>
            Show
          </a>
        </td>
      </tr>
    ))}
  </tbody>
);

Row.propTypes = {
  data: PropTypes.array.isRequired,
  showTask: PropTypes.func,
};

export default Row;
