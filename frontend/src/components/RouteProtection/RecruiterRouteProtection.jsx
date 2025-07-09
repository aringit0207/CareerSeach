import React from 'react'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RecruiterRouteProtection({ children }) {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user == null || user.role != "recruiter") {
      navigate("/");
    }
  }, []);
  
  return <>{children}</>;
}