import 'react-toastify/dist/ReactToastify.css'; 
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer } from "react-toastify";

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
import AddDirectMessage from '@pages/AddDirectMessage';
import { MessageProvider } from '@context/MessageContext';
import Channel from '@channel/Channel';
import SecuredRoute from '@components/SecuredRoute.jsx';


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
        element: (
       <SecuredRoute isPublicRoute={true}>

        <LoginPage />
        </SecuredRoute>
        ),
       
      },
    ],
  },


/*
{
  path: "send-message",
  element: (
    <>
    <AddDirectMessage />
  </>
  ),

},
*/

  {
    path: "/message-panel",
    element: (
      <SecuredRoute>
    <MessagePanel />
    </SecuredRoute>
    ),
    children: [
      {
        index: true,
     
      },
      {
        path: "send-message/",  
        element: (
          <SecuredRoute>
            <AddDirectMessage />
            </SecuredRoute>
        ),
   
      },
      {
        path: "channels/:channelId/:channelName",
        element: (
          <SecuredRoute>
          <Channel />
          </SecuredRoute>
        ),
      },
      
      
    ],
  },




]);

root.render(
  <>
  
    <MessageProvider>
   <DialogProvider>
    <RouterProvider router={router} />
    <ToastContainer/>
    </DialogProvider>
    </MessageProvider>

  
  </>

);
