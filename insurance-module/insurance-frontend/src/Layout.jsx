/* src/Layout.jsx */
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="App">
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;