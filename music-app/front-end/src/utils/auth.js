import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = (props) => {
    const {result} = props;
  if (result) {
    // console.log(result);
    return <Outlet />;
  }
  return <Navigate to={'/login'} />;
};

ProtectedRoute.propTypes = {
  user: PropTypes.string,
};

export default React.memo(ProtectedRoute);
