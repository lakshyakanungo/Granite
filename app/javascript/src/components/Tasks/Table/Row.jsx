import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import Tooltip from "components/Tooltip";

const Row = ({
  type = "pending",
  data,
  destroyTask,
  showTask,
  handleProgressToggle,
  starTask,
}) => {
  const isCompleted = type === "completed";
  const toggledProgress = isCompleted ? "pending" : "completed";

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map(rowData => (
        <tr key={rowData.id}>
          <td className="text-center">
            <input
              checked={isCompleted}
              type="checkbox"
              className="ml-6 w-4 h-4 text-bb-purple border-gray-300
                  rounded focus:ring-bb-purple cursor-pointer"
              onChange={() =>
                handleProgressToggle({
                  slug: rowData.slug,
                  progress: toggledProgress,
                })
              }
            />
          </td>
          <td
            className={classnames(
              "block w-64 px-6 py-4 text-sm font-medium leading-8 text-bb-purple capitalize truncate",
              {
                "cursor-pointer": !isCompleted,
                "text-opacity-50": isCompleted,
              }
            )}
            onClick={() => !isCompleted && showTask(rowData.slug)}
          >
            <Tooltip content={rowData.title} delay={200} direction="top">
              <div className="truncate max-w-64 ">{rowData.title}</div>
            </Tooltip>
          </td>
          {!isCompleted && (
            <>
              <td
                className="px-6 py-4 text-sm font-medium leading-5
                            text-bb-gray-600 whitespace-no-wrap"
              >
                {rowData.assigned_user.name}
              </td>
              <td className="pl-6 py-4 text-center cursor-pointer">
                <i
                  className={classnames(
                    "transition duration-300 ease-in-out text-2xl hover:text-bb-yellow p-1",
                    {
                      "text-bb-border ri-star-line":
                        rowData.status !== "starred",
                    },
                    {
                      "text-white text-bb-yellow ri-star-fill":
                        rowData.status === "starred",
                    }
                  )}
                  onClick={() => starTask(rowData.slug, rowData.status)}
                />
              </td>
            </>
          )}
          {isCompleted && (
            <>
              <td style={{ width: "164px" }} />
              <td className="pl-6 py-4 text-center cursor-pointer">
                <i
                  className="text-2xl text-center text-bb-border
                  transition duration-300 ease-in-out
                  ri-delete-bin-5-line hover:text-bb-red"
                  onClick={() => destroyTask(rowData.slug)}
                />
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  );
};

Row.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  destroyTask: PropTypes.func,
  showTask: PropTypes.func,
  handleProgressToggle: PropTypes.func,
  starTask: PropTypes.func,
};

export default Row;
