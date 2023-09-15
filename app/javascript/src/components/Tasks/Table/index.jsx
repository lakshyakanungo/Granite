import React from "react";

import Header from "./Header";
import Row from "./Row";

const Table = ({ data }) => (
  <div className="flex flex-col mt-10 ">
    <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 shadow md:custom-box-shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <Header />
            <Row data={data} />
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default Table;
