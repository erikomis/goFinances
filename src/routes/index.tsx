import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../context/AuthContext";

export const Routes = () => {
  const { user } = useAuth();
  console.log(user.email);
  return (
    <NavigationContainer>
      {user.name ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
