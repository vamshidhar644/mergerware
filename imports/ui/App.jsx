import React from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UseAuthContext } from '../../client/context/AuthContext';

import Home, { UserProfile } from './Home';
import Navbar from './Navbar';
import SignIn from './Auth/SignIn';
import Login from './Auth/Login';

Meteor.subscribe('users');

export const App = () => {
  const { user } = UseAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/signin"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />

          {/* <Route
            path="/profile"
            element={user ? <UserProfile /> : <Navigate to="/login" />}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
