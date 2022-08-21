import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import HttpClient from "../../Http-Client";
import { FallBack } from "../../components/Loader/index";
import { login } from "../../store/slices/auth";
import { useDispatch } from "react-redux";
import { AuthenticatedWrapper } from "../../wrappers/Auth";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [requestLoading, setRequestLoading] = useState(false);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });
  const { errors, isValid, values, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        remember: false,
      },
      validationSchema: loginSchema,
      onSubmit: (v) => {
        handleLoginSubmit(
          v,
          (res, err) => {
            const { data } = res ?? {};

            if (err) {
              setToaster({
                message: err?.response?.data?.message || err.message,
                type: "alert-error",
                show: true,
              });
            } else {
              // first sign token to the local storage
              localStorage?.setItem("X-AUTH-TOKEN", data?.token);
              // set authenticated to redux store
              dispatch(login(data));

              setRequestLoading(false);
              // navigate to the app page
              navigate("/", { replace: true });
            }
          },
          setRequestLoading
        );
      },
    });

  return (
    <AuthenticatedWrapper>
      <section className="bg-slate-50 min-h-screen">
        {toaster.show ? (
          <div className="toast toast-end">
            <div className="alert alert-error">
              <div>
                <span>{toaster.message}</span>
                <button
                  className="btn btn-xs btn-ghost"
                  onClick={() => {
                    setToaster({
                      message: "",
                      type: "",
                      show: false,
                    });
                  }}
                >
                  <FontAwesomeIcon icon="times-circle" />
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <h1 class=" text-dark text-5xl  text-center pt-8 font-bold">Login</h1>
        <div className="container mx-auto px-4 my-auto">
          <div className="bg-white rounded-lg shadow-lg my-auto mt-8">
            <div className="grid sm:grid-cols-2">
              <div className="bg-primary px-8  py-16 sm:rounded-l-lg rounded-lg">
                <div>
                  <h2 className="text-white text-2xl bold">Easy Banking</h2>
                  <p className="text-white">
                    Easy banking is a simple and easy to use banking application
                    that allows you to manage your accounts and transactions.
                  </p>
                </div>
                <div className="mt-8">
                  <p className="text-white">
                    Download the app and start managing your accounts and
                    transactions.
                  </p>
                  <button className="btn btn-success text-gray-50 rounded-lg mt-5">
                    <FontAwesomeIcon icon={["fab", "android"]} size="2x" />
                  </button>
                  <button className="btn btn-dark  ml-5 text-gray-50 rounded-lg mt-5">
                    <FontAwesomeIcon icon={["fab", "apple"]} size="2x" />
                  </button>
                </div>
              </div>
              <div className="px-8  py-16 rounded-r-lg">
                <form onSubmit={handleSubmit}>
                  <div className="form-control w-full max-w-xs">
                    <span className="label-text">
                      <span className="text-error">*</span>
                      <span>username</span>
                    </span>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="username"
                      type="text"
                      value={values.username}
                      placeholder="lorem inpsum"
                      className={`input input-bordered  w-full max-w-xs`}
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.username}
                      </span>
                    </label>
                  </div>

                  <div className="form-control w-full max-w-xs mt-5">
                    <span class="label-text">
                      <span className="text-error">*</span>
                      <span>password</span>
                    </span>
                    <input
                      type="password"
                      placeholder="********"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      value={values.password}
                      class={`input input-bordered  w-full max-w-xs`}
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password}
                      </span>
                    </label>
                  </div>

                  <div className="form-control">
                    <label class="label cursor-pointer">
                      <span class="label-text">Remember me</span>
                      <input
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="remember"
                        value={values.remember}
                        type="checkbox"
                        checked={values.remember}
                        class="checkbox"
                      />
                    </label>
                  </div>
                  <div className="flex justify-between items-center mt-5">
                    <button
                      type="submit"
                      className={`btn btn-primary ${
                        !isValid ? "btn-disabled" : ""
                      } `}
                    >
                      Login
                    </button>
                    <Link to="/forget-password" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <Link to="/register" className="text-secondary">
                      Don't have an account?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {requestLoading ? <FallBack /> : null}
    </AuthenticatedWrapper>
  );
}

const loginSchema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
  remember: yup.boolean().default(false),
});

const handleLoginSubmit = async (values, cb, setLoading) => {
  try {
    setLoading(true);
    const data = await HttpClient.post("/auth/login", values);
    cb(data, null);
    setLoading(false);
  } catch (err) {
    setLoading(false);
    cb(null, err);
  }
};
