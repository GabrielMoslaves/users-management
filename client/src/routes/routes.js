import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Login from "../Pages/Login/login";
import ManageAccounts from "../Pages/ManageAccounts/manageAccounts";
import MainNav from "../Components/MainNav/mainNav";
import ProfilePage from "../Pages/ProfilePage/profilePage";
import SignUp from "../Pages/SignUp/signUp";
import { useSession } from "../Providers/SessionProvider";

const RoutesWrapper = () => {
  const { session } = useSession();

  const isAuthenticated = Boolean(session);

  const Template = () => {
    return (
      <PrivateRoute>
        <MainNav>
          <Outlet />
        </MainNav>
      </PrivateRoute>
    );
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/criar-uma-conta" element={<SignUp />} />

        <Route element={<Template />}>
          <Route path="/gerenciamento-de-contas" element={<ManageAccounts />} />
          <Route path="/perfil-do-usuario/:userId" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesWrapper;
