import Dashboard from "./pages/Dashboard";
import Locations from "./pages/location";
import AddLocation from "./pages/location/add";
import EditLocation from "./pages/location/edit";
import Transactions from "./pages/transactions";
import Schedule from "./pages/schedule";
import Payment from "./pages/payment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/forget-password";
import Accounts from "./pages/accounts";
import Users from "./pages/users";
import Urgents from "./pages/urgents";
import AddUrgents from "./pages/urgents/add";
import EditUrgents from "./pages/urgents/edit";
import EditAccounts from "./pages/accounts/edit";
import EditUsers from "./pages/users/edit";
import Chat from "./pages/chat";
import Profile from "./pages/profile";

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
    path: "/locations/edit/:id",
    Page: EditLocation,
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
    path: "/accounts",
    Page: Accounts,
  },
  {
    path: "/accounts/edit/:id",
    Page: EditAccounts,
  },
  {
    path: "/users",
    Page: Users,
  },
  {
    path: "/users/edit/:id",
    Page: EditUsers,
  },
  {
    path: "/urgents",
    Page: Urgents,
  },
  {
    path: "/urgents/add",
    Page: AddUrgents,
  },
  {
    path: "/urgents/edit/:id",
    Page: EditUrgents,
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
  {
    path: "/chat",
    Page: Chat,
  },
  {
    path: "/profile",
    Page: Profile,
  },
];

export default routes;
