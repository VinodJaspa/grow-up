import React from 'react';
import { Route, Routes, Navigate, Router, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignUp from './Components/SignUp/signUp';
import SignIn from './Components/Login';
import Navbar from './Components/NavBar/nav-bar';
import Home from './Components/Home/home';



// Lazy loading for components
const TaskTable = React.lazy(() => import('./Components/TaskTable/task-table'));
const PerformanceGraph = React.lazy(() => import('./Components/PerfromanceChart/performance-graph'));
const MoodTracker = React.lazy(() => import('./Components/MoodTracker/mood-tracker'));
const ChallengesTabs = React.lazy(() => import('./Pages/challengesTab'));
const Settings = React.lazy(() => import('./Components/Settings/settings'));


const AppRoutes = ({ themeMode }) => {
  const user = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Private Route Logic
  const PrivateRoute = ({ element: Element, ...rest }) => {

    return <Element {...rest} />;
  };
  const AuthRoutes = () => (
    <Routes>
      <Route element={<PrivateLayout themeMode={themeMode} />}>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<PrivateRoute element={<TaskTable />} />} />
        <Route path="/graph" element={<PrivateRoute element={<PerformanceGraph />} />} />
        <Route path="/mood" element={<PrivateRoute element={<MoodTracker />} />} />
        <Route path="/growth" element={<PrivateRoute element={<ChallengesTabs />} />} />
        <Route path="/settings" element={<PrivateRoute element={<Settings />} />} />
      </Route>
    </Routes>

  );

  const PublicRoutes = () => (
    <Routes>
      {/* Public routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />

    </Routes>
  );
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }

  }, [user])



  return (

    <>
      {user ? <AuthRoutes /> : <PublicRoutes />}
    </>
  )
};

const PrivateLayout = ({ children, themeMode }) => {

  return (
    <>
      <Navbar themeMode={themeMode} />
      {children}
    </>
  );
};



export default AppRoutes;
