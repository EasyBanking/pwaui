import { useLocation } from "react-router-dom";
import Activation from "../../components/Activation";

export default function Registered(props) {
  const { state } = useLocation();
  const { message, variant, title } = state || {};
  return <Activation variant={variant} title={title} text={message} />;
}
