
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

/*
  {
    path: "message-panel/create-alias",
    element: (
        <MessagePanel />
    ),
  },

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
    element: <MessagePanel />,
    children: [
      {
        index: true,
     
      },
      {
        path: "send-message/",
        element: (
      
            <AddDirectMessage />
   
        ),
   
      },
      {
        path: "channels/:channelName",
        element: (
          <Channel />
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
    </DialogProvider>
    </MessageProvider>
  </>

);
