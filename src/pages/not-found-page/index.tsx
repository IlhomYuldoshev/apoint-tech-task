import React from "react";
import { Navigate } from "react-router";

type Props = {};

const NotFoundPage = (props: Props) => {
  return <Navigate to="/reports" />;
};

export default NotFoundPage;
