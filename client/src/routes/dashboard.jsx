import Colors from "../views/Main/Colors/Colors.js";
import Lugpatterns from "../views/Main/Lugpatterns/Lugpatterns.js";
import Countries from "../views/Main/Countries/Countries.js";
import Makes from '../views/Main/Makes/Makes.js';
import Wheels from '../views/Main/Wheels/Wheels.js';

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import BuildIcon from "@material-ui/icons/Build";
import FlagIcon from "@material-ui/icons/Flag";
import TextureIcon from "@material-ui/icons/Texture";
import ColorLensIcon from "@material-ui/icons/ColorLens";

var dashRoutes = [
  {
    path: "/wheel",
    name: "Wheel",
    icon: DashboardIcon,
    component: Wheels
  },
  {
    path: "/make",
    name: "Make",
    icon: BuildIcon,
    component: Makes
  },
  {
    path: "/country",
    name: "Country",
    icon: FlagIcon,
    component: Countries
  },
  {
    path: "/lugpattern",
    name: "Lugpattern",
    icon: TextureIcon,
    component: Lugpatterns
  },
  {
    path: "/color",
    name: "Color",
    icon: ColorLensIcon,
    component: Colors
  },
  { redirect: true, path: "/", pathTo: "/wheel", name: "Wheel" },
];
export default dashRoutes;
