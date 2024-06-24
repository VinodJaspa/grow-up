// utils/routes.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// PrivateRoute component for authenticated routes
export const PrivateRoute = ({ user, path, element }) => {
  return user ? <Route path={path} element={element} /> : <Navigate to="/login" />;
};

// PublicRoute component for public routes
export const PublicRoute = ({ user, path, element }) => {
  return !user ? <Route path={path} element={element} /> : <Navigate to="/" />;
};
