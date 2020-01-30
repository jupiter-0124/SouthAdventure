import LoginPage from "../views/auth/LoginPage";
import RegisterPage from "../views/auth/RegisterPage";

const authRoutes = [
  { path: "/auth/login", name: "Login", short: "Login", component: LoginPage },
  { path: "/auth/register", name: "Register", short: "Register", component: RegisterPage },
  { redirect: true, path: "/auth", pathTo: "/auth/login", name: "Login" },
];

export default authRoutes;
