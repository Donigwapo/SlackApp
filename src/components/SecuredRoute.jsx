/* eslint-disable react/prop-types */
import { Navigate, useLocation } from 'react-router-dom';


const SecuredRoute = ({ children, isPublicRoute = false }) => {
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('access-token') && localStorage.getItem('client') && localStorage.getItem('uid');
  const location = useLocation();

  if (isPublicRoute && isLoggedIn) {

    return <Navigate to="/message-panel" state={{ from: location }} replace />;

  }

  if (!isPublicRoute && !isLoggedIn) {

    alert('You are not logged in. Please log in to access this page.');

    return <Navigate to="/loginPage" state={{ from: location }} replace />;

  }


  return children;
};
export default SecuredRoute;
