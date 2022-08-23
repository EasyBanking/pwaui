import { Text, Grid, Container, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Body = (props) => {
  return (
    <Grid
      sm={10}
      style={{ marginLeft: "auto", display: "block" }}
      css={{ backgroundColor: "$light", height: "100%" }}
    >
      {props.children}
    </Grid>
  );
};

const Layout = (props) => {
  return (
    <main>
      <Grid.Container>
        <SideBar />
        <Body>
          <TopBar />
          <Container fluid>{props.children}</Container>
        </Body>
      </Grid.Container>
    </main>
  );
};

const Menu = [
  {
    name: "Dashboard",
    icon: "dashboard",
    path: "/",
    visibleFor: ["Admin"],
  },
  {
    name: "Transactions",
    icon: "list-check",
    path: "/transactions",
    visibleFor: ["Admin"],
  },
  {
    name: "Payments",
    icon: "money-bill",
    path: "/payments",
    visibleFor: ["Admin"],
  },
  {
    name: "Accounts",
    icon: "user-circle",
    path: "/accounts",
    visibleFor: ["Admin"],
  },
  {
    name: "Users",
    icon: "users",
    path: "/users",
    visibleFor: ["Admin"],
  },
  {
    name: "Schedules",
    icon: "calendar",
    path: "/schedule",
    visibleFor: ["Admin", "Customer Service"],
  },
  {
    name: "Locations",
    icon: "map-marker-alt",
    path: "/locations",
    visibleFor: ["Admin"],
  },
  {
    name: "Urgents",
    icon: "info",
    path: "/urgents",
    visibleFor: ["Admin"],
  },
  {
    name: "Contacts",
    icon: "envelope",
    path: "/contact",
    visibleFor: ["Admin"],
  },
  {
    name: "Chat",
    icon: "headset",
    path: "/chat",
    visibleFor: ["Admin"],
  },
];

const isActiveLink = (location, path) => location.pathname === path;

const TopBar = (props) => {
  const router = useNavigate();
  return (
    <div className="w-full bg-white">
      <div className="px-4 py-6 ">
        <div className="flex flex-row justify-between items-center ">
          <Input
            className="ml-5"
            placeholder="search here"
            contentLeft={<FontAwesomeIcon icon="search" />}
          />
          <div>
            <button
              onClick={() => router("/profile")}
              className="hover:opacity-80 bg-primary w-6 h-6  mx-4 text-white rounded-full"
            >
              <span>i</span>
            </button>

            <button
              className="hover:opacity-80"
              onClick={() => {
                localStorage?.removeItem("X-AUTH-TOKEN");
                window.location.replace("/login");
              }}
            >
              <FontAwesomeIcon
                icon={"circle-right"}
                size="xl"
                className="text-error"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SideBar = (props) => {
  const usr = {
    role: "Admin",
  };
  const location = useLocation();
  return (
    <Grid sm={2} className="fixed left-0 top-0 w-full shadow-lg">
      <aside className="h-screen w-full px-4 py-4">
        <div className="heading  pl-1 w-full flex flex-row justify-start items-center">
          <span className="rounded-md py-1 px-3  bg-primary">
            <Text color="white">EB</Text>
          </span>
          <Text h5 css={{ marginLeft: "15px" }}>
            Easy Banking
          </Text>
        </div>
        <div className="menu w-full mt-8">
          {Menu.map((item, i) => {
            return (
              <NavLink
                key={`nav-link-${i}`}
                className={`w-full text-primary mb-1 ${
                  item.visibleFor.includes(usr.role) ? "block" : "hidden"
                }`}
                to={item.path}
              >
                <span
                  className={`flex flex-row items-center p-2 ${
                    isActiveLink(location, item.path)
                      ? "bg-light"
                      : "hover:bg-light"
                  } rounded-md`}
                >
                  <span style={{ width: "50px" }}>
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <span>{item.name}</span>
                </span>
              </NavLink>
            );
          })}
        </div>
      </aside>
    </Grid>
  );
};

export default Layout;
