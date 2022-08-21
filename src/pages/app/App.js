import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import pages from "../../pages";
import store from "../../store";


library.add(fas);
library.add(far);
library.add(fab);



const theme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#3a0ca3",
      secondary: "#7209b7",
      info: "#f72585",
      sub: "#4361ee",
      extra: "#4cc9f0",
      error: "#e63946",
      warning: "#ffc300",
      success: "#00af54",
      light: "#e5e5e5",
      dark: "#323031",
      white: "#ffff",
    }
  },
});

function App() {
  return (
    <Provider store={store}>
      <NextUIProvider theme={theme}>
        <Routes>
          {pages.map(({ Page, path }) => {
            return (
              <Route
                key={Math.round() + "key"}
                element={<Page />}
                path={path}
              />
            );
          })}
        </Routes>
      </NextUIProvider>
    </Provider>
  );
}

export default App;
