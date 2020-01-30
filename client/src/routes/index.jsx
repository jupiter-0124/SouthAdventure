import Dashboard from "../layouts/Dashboard.jsx";
import Login from "../views/auth/Login.jsx";
import Register from "../views/auth/Register.jsx";

var indexRoutes = [
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/", name: "Home", component: Dashboard },
];

export default indexRoutes;
