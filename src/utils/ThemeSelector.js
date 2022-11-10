import React from "react";

const AdminTheme = React.lazy(() => import('assets/themes/AdminTheme'));
const AppTheme = React.lazy(() => import('assets/themes/AppTheme'));

const ThemeSelector = () => {
  const pathname = window.location.pathname.split('/')[1];
  
  return (
    <React.Suspense fallback={() => null}>
      {pathname === "admin" ? 
        <AdminTheme />
      : 
        <AppTheme />
      }
    </React.Suspense>
  )
}

export default ThemeSelector