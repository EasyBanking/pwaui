import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import HttpClient from "../../Http-Client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FallBack, LoaderWrapper } from "../../components/Loader";

export default function ForgetPassword() {
  const [isLoading_, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const { errors, isValid, handleBlur, handleChange, handleSubmit, values } =
    useFormik({
      initialValues: {
        email: "",
        answear: "",
        question: "",
      },
      validationSchema: forgetPasswordSchema,
      onSubmit: async (values) =>
        handleForgetPassword(
          values,
          (data, err) => {
            if (err) {
              console.log(err.message);
              return setToaster({
                message: err?.response?.data?.message || err.message,
                type: "alert-error",
                show: true,
              });
            }

            setToaster({
              message: data.message,
              type: "alert-success",
              show: true,
            });

            setTimeout(() => {
              navigate("/info", {
                state: {
                  message: data.message,
                  title: "Restore Passwrod",
                  variant: "text-success",
                },
              });
            }, 1000);
          },
          setIsLoading
        ),
    });

  const { data, isLoading, error } = useQuery(
    ["questionsList"],
    async () => {
      const { data } = await HttpClient.get("/questions");
      const questions = data.data;
      return questions;
    },
    {
      onError: () => {
        setToaster({
          message: "Error loading questions",
          type: "alert-error",
          show: true,
        });
      },
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  if (isLoading) {
    return <LoaderWrapper />;
  }

  return (
    <>
      {isLoading_ ? <FallBack /> : null}
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
          Forget Password
        </h1>
        <div className="container mx-auto px-4 my-auto">
          <div className="bg-white rounded-lg shadow-lg my-auto mt-8">
            <div className="grid grid-cols-2">
              <div className="bg-primary px-8   py-16 rounded-l-lg">
                <div>
                  <h2 className="text-white text-2xl bold">Easy Banking</h2>
                  <p className="text-white">
                    Easy banking is a simple and easy to use banking application
                    that allows you to manage your accounts and transactions.
                  </p>
                </div>
                <div className="mt-5">
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
                      <span>email</span>
                    </span>
                    <input
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                      placeholder="loreminpsum@gmail.com"
                      className="input input-bordered  w-full max-w-xs"
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email}
                      </span>
                    </label>
                  </div>

                  <div className="form-control w-full max-w-xs mt-5">
                    <label class="label">
                      <span class="label-text">
                        <span className="text-error">*</span> security question
                      </span>
                    </label>
                    <select
                      name="question"
                      value={values.question}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      defaultValue={data?.questions?.[0]?.value}
                      className="select select-bordered w-full max-w-xs"
                    >
                      {data?.map((question) => {
                        return (
                          <option value={question.content}>
                            {question.content}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-control w-full max-w-xs mt-5">
                    <span class="label-text">
                      <span className="text-error">*</span>
                      <span>security answear</span>
                    </span>
                    <input
                      name="answear"
                      value={values.answear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="orange"
                      className="input input-bordered  w-full max-w-xs"
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.answear}
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <button className="btn btn-primary" type="submit">
                      reset
                    </button>
                    <Link to="/" className="text-primary">
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

const forgetPasswordSchema = yup.object({
  email: yup.string().email().required(),
  question: yup.string().required(),
  answear: yup.string().required(),
});

const handleForgetPassword = async (values, cb, setLoading) => {
  try {
    setLoading(true);
    const { data } = await HttpClient.post("/auth/forget-password", values);
    cb(data, null);
    setLoading(false);
    return data;
  } catch (err) {
    setLoading(false);
    cb(null, err);
    return err;
  }
};
