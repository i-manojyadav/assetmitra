import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Journal from './pages/Journal.jsx';
import Strategy from './pages/Strategy.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      {index: true, element: <Dashboard />},
      {path: "portfolio", element: <Portfolio />},
      {path: "journal", element: <Journal />},
      {path: "strategy", element: <Strategy />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
