import { Navigate } from 'react-router-dom';
import * as authHelper from '../auth/core/auth-helpers';
import type { ReactNode } from 'react';
import { useUserProfile } from '../store/userProfile';
import { hasUserPermission } from '../auth/core/auth-helpers';

interface ProtectedRouteProps {
  children: ReactNode;
  permissionName?: string | string[];
  requiredActions?: string;
  redirectTo?: string;
}

function ProtectedRoute({
  children,
  permissionName,
  requiredActions = 'view',
  redirectTo = '/',
}: ProtectedRouteProps) {
  const currentUser = authHelper.getUser();
  const { userProfile } = useUserProfile();

  const action = requiredActions;
  const isAllowed =
    !!currentUser &&
    (!permissionName || hasUserPermission(userProfile, permissionName, action));

  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
