import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as yup from "yup";
import HttpClient from "../../Http-Client";
import { useFormik } from "formik";
import { FallBack } from "../../components/Loader";

export default function RestorePassword() {
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });
  const { handleBlur, handleChange, handleSubmit, errors, values, isValid } =
    useFormik({
      initialValues: {
        password: "",
        confirmPassword: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: (values) =>
        handleResetPassword(
          { ...values, token },
          (data, err) => {
            if (err) {
              setToaster({
                message: err?.response?.data?.message || err?.message,
                type: "alert-error",
                show: true,
              });
            } else {
              setToaster({
                message: data?.message,
                type: "alert-success",
                show: true,
              });

              setTimeout(() => {
                navigate("/login", { replace: true });
              }, 1000);
            }
          },
          setLoading
        ),
    });

  return (
    <>
      {loading ? <FallBack /> : null}

      <section className="bg-slate-50 min-h-screen">
        {toaster.show ? (
          <div className="toast toast-end">
            <div className={`alert ${toaster.type ?? "alert-error"}`}>
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

        <h1 class=" text-dark text-5xl  text-center pt-8 font-bold">
          Restore Password
        </h1>
        <div className="container mx-auto px-4 my-auto">
          <div className="bg-white rounded-lg shadow-lg my-auto mt-8">
            <div className="grid sm:grid-cols-2">
              <div className="bg-primary px-8  py-16 rounded-l-lg">
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
                    <span class="label-text">
                      <span className="text-error">*</span>
                      <span>password</span>
                    </span>
                    <input
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      type="password"
                      placeholder="******"
                      class="input input-bordered  w-full max-w-xs"
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password}
                      </span>
                    </label>
                  </div>

                  <div className="form-control w-full max-w-xs mt-5">
                    <span class="label-text">
                      <span className="text-error">*</span>
                      <span>confirm password</span>
                    </span>
                    <input
                      type="password"
                      placeholder="******"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      class="input input-bordered  w-full max-w-xs"
                    />

                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword}
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <button className="btn btn-primary" type="submit">
                      Restore
                    </button>
                    <Link to="/login" className="text-primary">
                      login ?
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
    </>
  );
}

const handleResetPassword = async (values, cb, setLoader) => {
  try {
    setLoader(true);
    let token = values?.["token"];
    delete values["token"];
    delete values["confirmPassword"];

    const { data } = await HttpClient.post(
      `/auth/reset-password/${token}`,
      values
    );
    cb(data, null);
    setLoader(false);
  } catch (err) {
    setLoader(false);
    cb(null, err);
  }
};

const resetPasswordSchema = yup.object({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match")
    .required(),
});
