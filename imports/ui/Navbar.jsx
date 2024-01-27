import React from 'react';
import { useLogout } from '../../client/context/useLogout';
import { UseAuthContext } from '../../client/context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user } = UseAuthContext();
  const { logout } = useLogout();

  return (
    user && (
      <nav>
        <button onClick={logout}>Logout</button>
      </nav>
    )
  );
};

export default Navbar;
