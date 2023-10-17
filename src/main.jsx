/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import LinkPage from './components/LinkPage';
import Unauthorized from './components/Unauthorized';
import Missing from './components/Missing';
import Home from './components/Home';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Lounge from './components/Lounge';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import './index.css';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Missing />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'linkpage',
        element: <LinkPage />,
      },
      {
        path: 'unauthorized',
        element: <Unauthorized />,
      },
      {
        element: <PersistLogin />,
        children: [
          {
            element: <RequireAuth />,
            children: [
              {
                path: '/',
                element: <Home />,
              },
              {
                path: 'editor',
                element: <Editor />,
              },
              {
                path: 'admin',
                element: <Admin />,
              },
              {
                path: 'lounge',
                element: <Lounge />,
              },
            ],
          },
        ],
      },
    ],
  },
], {
  basename: '/react-authentication'
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
