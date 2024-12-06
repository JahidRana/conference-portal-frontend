import React from 'react';
import ReactDOM from 'react-dom';
import AuthProvider from './Component/Context/AuthProvider/AuthProvider';
import router from './router';
import { RouterProvider } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
