import Loadable from "app/components/Loadable";
import { lazy } from "react";

const NotFound = lazy(() => import("./NotFound"));
const ForgotPassword = lazy(() => import("./ForgotPassword"));

const FirebaseLogin = lazy(() => import("./login/FirebaseLogin"));
const FirebaseRegister = lazy(() => import("./register/FirebaseRegister"));

const JwtLogin = Loadable(lazy(() => import("./login/JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./register/JwtRegister")));
// const Auth0Login = Loadable(lazy(() => import("./login/Auth0Login")));

const sessionRoutes = [
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "*", element: <NotFound /> }
];

export default sessionRoutes;
