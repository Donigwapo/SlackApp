
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DialogProvider } from '@context/DialogRoutingContext';
import Home from '@pages/Home';
import Resources from '@pages/Resources';
import Product from '@pages/Product';
import Features from '@pages/Features';
import Pricing from '@pages/Pricing';
import LoginPage from './pages/loginPage';
import MessagePanel from './pages/MessagePanel';

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "productOverview",
        element: <Product />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "resources",
        element: <Resources />,
      },
      {
        path: "loginPage",
        element: <LoginPage />,
      },
    ],
  },

  {
    path: "message-panel",
    element: (
        <MessagePanel />
    ),
  },
  {
    path: "message-panel/create-alias",
    element: (
        <MessagePanel />
    ),
  }
]);

root.render(
  <>
   <DialogProvider>
    <RouterProvider router={router} />
    </DialogProvider>
  </>

);
