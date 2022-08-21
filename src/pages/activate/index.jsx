import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Activation from "../../components/Activation";
import { useMutation } from "@tanstack/react-query";
import HttpClient from "../../Http-Client";
import { LoaderWrapper } from "../../components/Loader";

export default function Activate(props) {
  const param = useParams();

  const { isLoading, data, error, mutate } = useMutation(
    ["activate", param.token],
    async () => {
      return HttpClient.get(`/auth/activate`, {
        params: {
          token: param.token,
        },
      });
    },
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (param?.token) {
      mutate();
    }
  }, [param]);

  if (isLoading) {
    return <LoaderWrapper />;
  }

  return (
    <Activation
      variant={error ? "text-error" : "text-success"}
      title={"activation"}
      text={
        error
          ? error?.response?.data?.message || error?.message
          : "your account has been activated successfully"
      }
    />
  );
}
