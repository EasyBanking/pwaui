import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HttpClient from "../Http-Client";
import { LoaderWrapper } from "../components/Loader";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/auth";
import { useLayoutEffect } from "react";

const AUTH_KEY = "X-AUTH-TOKEN";

export const AuthGuard = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    HttpClient.get("/auth/checkme")
      .then(({ data }) => {
        const { user } = data;
        if (user.role !== "ADMIN") {
          localStorage?.removeItem(AUTH_KEY);
          return router("/login", { replace: true });
        }
        dispatch(login(user));
        setIsLoad(true);
      })
      .catch((err) => {
        console.log(err);
        localStorage?.removeItem(AUTH_KEY);
        router("/login", { replace: true });
      });
  }, []);

  if (isLoad) {
    return props.children;
  }

  return <LoaderWrapper />;
};

export const AuthenticatedWrapper = (props) => {
  const [isLoad, setIsLoad] = useState(false);
  const { state } = useLocation();
  const router = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    HttpClient.get("/csrf")
      .then(({ data }) => {
        localStorage.setItem("csrf", data);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY)) {
      router("/app", { replace: true });
    } else {
      setIsLoad(true);
    }
  }, []);

  if (!isLoad) {
    return <LoaderWrapper />;
  }

  return props.children;
};

export const PassWithCondition = (props) => {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    if (props.isLoad && props.condition) {
      setIsLoad(true);
    }

    if (props.isLoad && !props.condition && props.fallback) {
      props.fallback();
    }
  }, [props]);

  if (!isLoad) {
    return <LoaderWrapper />;
  }

  return props.children;
};
