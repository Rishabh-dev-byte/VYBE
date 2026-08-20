import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./components/ui/Login";
import Signup from "./components/ui/Signup";


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
   
  }
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthContextProvider><RouterProvider router={router}/></AuthContextProvider>
        
    </StrictMode>
);