import Dashboard from "./pages/Dashboard";
import Locations from "./pages/location";
import AddLocation from "./pages/location/add";
import Transactions from "./pages/transactions";
import Schedule from "./pages/schedule";
import Payment from "./pages/payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/forget-password";

// dashboard routes here

const routes = [
  {
    path: "/",
    Page: Dashboard,
  },
  {
    path: "/locations",
    Page: Locations,
  },
  {
    path: "/locations/add",
    Page: AddLocation,
  },
  {
    path: "/transactions",
    Page: Transactions,
  },
  {
    path: "/schedule",
    Page: Schedule,
  },
  {
    path: "/payments",
    Page: Payment,
  },
  {
    path: "/login",
    Page: Login,
  },
  {
    path: "/forget-password",
    Page: ForgetPassword,
  },
  {
    path: "/register",
    Page: Register,
  },
];

export default routes;
