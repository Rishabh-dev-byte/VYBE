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
import AuthLayout from "./components/ui/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthLayout>
        <Profile />
      </AuthLayout>
    ),
  },
  {
    path: "/tweets",
    element: (
      <AuthLayout>
        <Tweets />
      </AuthLayout>
    ),
  },
  {
    path: "/Mytweets",
    element: (
      <AuthLayout>
        <MyTweet />
      </AuthLayout>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
);
