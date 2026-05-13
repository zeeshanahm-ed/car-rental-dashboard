import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Layout from '../components/layout/layout';
import ManageCars from '../pages/manage-cars/ManageCars';
import AddCar from '../pages/add-car/AddCar';
import UserManagement from '../pages/user-management/UserManagement';




function PrivateRoutes() {
  // const { currentUser } = useAuth();

  return (

    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/manage-cars' element={<ManageCars />} />
        <Route path='/add-car' element={<AddCar />} />
        <Route path='/user-management' element={<UserManagement />} />

        {/* Catch all route */}
        <Route path='*' element={<Navigate to='/' />} />
      </Route>
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  );
}

export { PrivateRoutes };
