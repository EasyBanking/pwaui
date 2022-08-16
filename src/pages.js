import Dashboard from "./pages/Dashboard";
import Locations from "./pages/location";
import AddLocation from "./pages/location/add";
 import Transactions from "./pages/transactions";
import Schedule from "./pages/schedule";
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
  }
];

export default routes;
