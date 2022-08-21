import { useLocalStorage } from "../hooks/localstorage";

export default function ThemeWrapper(props) {
  const [theme] = useLocalStorage("theme", "light");
  return <main data-theme={theme}>{props.children}</main>;
}
