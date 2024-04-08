import React from "react";

const ErrorMessage = ({ children }) => {
  return <p className="text-sm text-red-400">{children}</p>;
};

export default ErrorMessage;
