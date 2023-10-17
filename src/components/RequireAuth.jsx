import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

const routePermissions = {
  home: [2001],
  editor: [1984],
  admin: [5150],
  lounge: [1984, 5150],
};

const RequireAuth = () => {
  const location = useLocation();

  let currentPath = location.pathname.replace('/', '');

  // If path is root ("/"), change it to "home"
  if (currentPath === '') {
    currentPath = 'home';
  }

  const allowedRoles = routePermissions[currentPath] || [];

  const token = useSelector(selectCurrentToken);

  let roles = [];

  // Decode token only if it's present
  if (token) {
    const decoded = jwt_decode(token);
    roles = decoded?.UserInfo?.roles || [];
  }

  // Check if the user has any of the allowed roles
  const hasPermission = roles.some((role) => allowedRoles.includes(role));

  // If user has required role, render the content, else navigate to appropriate page
  if (hasPermission) {
    return <Outlet />;
  } else if (token) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};


export default RequireAuth;
