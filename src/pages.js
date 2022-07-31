import Dashboard from "./pages/Dashboard";
import Locations from "./pages/location";
import AddLocation from "./pages/location/add";
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
];

export default routes;
