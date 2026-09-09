import { useAuthContext } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children, authentication = true }) => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && !authUser) {
      navigate("/login");
    } else if (!authentication && authUser) {
      navigate("/");
    }
    setLoader(false);
  }, [authUser, authentication,navigate]);

  return loader ? <>Loading..</> : <>{children}</>;
};

export default AuthLayout;
