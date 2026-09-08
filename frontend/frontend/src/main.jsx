import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./components/ui/Login";
import Signup from "./components/ui/Signup";
import Profile from "./components/ui/Profile";
import Tweets from "./pages/Tweets";
import MyTweet from "./pages/MyTweet";


const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
   
  },
   {
    path:"/login",
    element:<Login/>,
   
  },
  {
    path:"/signup",
    element:<Signup/>,
   
  },
   {
    path:"/profile",
    element:<Profile/>,
   
  },
   {
    path:"/tweets",
    element:<Tweets/>,
   
  },
   {
    path:"/Mytweets",
    element:<MyTweet/>,
   
  }
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthContextProvider><RouterProvider router={router}/></AuthContextProvider>
        
    </StrictMode>
);