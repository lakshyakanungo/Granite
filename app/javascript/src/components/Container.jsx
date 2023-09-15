import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import NavBar from "components/NavBar";

const Container = ({ children, className = "" }) => (
  <>
    <NavBar />
    <div
      className={classnames("px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8", [
        className,
      ])}
    >
      <div className="max-w-3xl mx-auto">{children}</div>
    </div>
  </>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
