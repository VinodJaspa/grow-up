import React, { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, BrowserRouter as Router, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BouncingDotsLoader from "./Components/BouncingLoader/bouncingLoader";
import Home from './Components/Home/home';
import Navbar from './Components/NavBar/nav-bar';

// Lazy loading for components
const TaskTable = React.lazy(() => import('./Components/TaskTable/task-table'));
const PerformanceGraph = React.lazy(() => import('./Components/PerfromanceChart/performance-graph'));
const MoodTracker = React.lazy(() => import('./Components/MoodTracker/mood-tracker'));
const ChallengesTabs = React.lazy(() => import('./Pages/challengesTab'));
const SignUp = React.lazy(() => import('./Components/SignUp/signUp'));
const SignIn = React.lazy(() => import('./Components/Login'));



const AppRoutes = ({ themeMode }) => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();




  console.log(user,"user");
 useEffect(() => {
   if(location.pathname === '/login' || location.pathname === '/signup'  && user){
    navigate("/")
   }
   
   return () => {
     
   }
 }, [user]);
 
 
 
  const AuthRoutes = () => (
    <Routes>
      <Route element={<PrivateLayout themeMode={themeMode} />}>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<PrivateRoute element={<TaskTable />} />} />
        <Route path="/graph" element={<PrivateRoute element={<PerformanceGraph />} />} />
        <Route path="/mood" element={<PrivateRoute element={<MoodTracker />} />} />
        <Route path="/growth" element={<PrivateRoute element={<ChallengesTabs />} />} />
      </Route>
    </Routes>
  );

  const PublicRoutes = () => (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
 //Chek if user id logged in or not
 const PrivateRoute = ({ element }) => {
  return user ? element : <Navigate to="/login" />
};



  const PrivateLayout = ({ themeMode, }) => {
    return (
      <>
        <Navbar themeMode={themeMode} />
        <Outlet />
      </>
    );
  };

  return (
    <Suspense fallback={<BouncingDotsLoader />}>
      {user ? <AuthRoutes /> : <PublicRoutes />}
    </Suspense>
  );
};


export default AppRoutes;
