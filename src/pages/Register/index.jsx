import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HttpClient from "../../Http-Client";
import { FallBack, LoaderWrapper } from "../../components/Loader";
import { useFormik } from "formik";
import * as yup from "yup";
import { AuthenticatedWrapper } from "../../wrappers/Auth";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading_, setIsLoading] = useState(false);
  const { data, isLoading, error } = useQuery(
    ["questionsList"],
    async () => {
      const { data } = await HttpClient.get("/questions");
      const questions = data.data;
      return questions;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    }
  );

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  const [step, setStep] = useState(1);

  const [pimg, setPimg] = useState("");

  const { errors, values, handleBlur, handleChange, handleSubmit, isValid } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        email: "",
        question: "",
        answear: "",
        pimg: "",
      },
      validationSchema: registerSchema,
      onSubmit: (v) =>
        handleRegisterSubmit(
          { ...v, pimg },
          (data, err) => {
            if (err) {
              setToaster({
                message: err?.response?.data?.message || err.message,
                type: "alert-error",
                show: true,
              });
            } else {
              setToaster({
                message: "successfully registered",
                type: "alert-success",
                show: true,
              });

              setTimeout(() => {
                const msg =
                  "you have successfully registered .. an activation token send to your email!";
                navigate(`/info`, {
                  replace: true,
                  state: {
                    message: msg,
                    title: "success",
                    variant: "text-success",
                  },
                });
              }, 1000);
            }
          },
          setIsLoading
        ),
    });

  const [steps, setSteps] = useState([
    {
      title: "basic",
      isValid: false,
    },
    {
      title: "Security",
      isValid: false,
    },
  ]);

  useEffect(() => {
    if (error) {
      setToaster({
        message: error.message,
        type: "error",
        show: true,
      });
    }
  }, [error]);

  if (isLoading) {
    return <LoaderWrapper />;
  }

  console.log(errors);

  return (
    <AuthenticatedWrapper>
      {isLoading_ ? <FallBack /> : null}

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

      <section className="bg-slate-50 min-h-screen py-8">
        <h1 class=" text-dark text-5xl  text-center  font-bold">Register</h1>
        <div className="container mx-auto px-4 my-auto">
          <div className="bg-white rounded-lg shadow-lg my-auto mt-8">
            <div className="grid sm:grid-cols-2">
              <div className="bg-primary px-8  py-16 rounded-l-lg rounded-lg">
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
                <ul class="steps steps-vertical lg:steps-horizontal">
                  {steps.map((s, index) => {
                    if (index === 0) {
                      return (
                        <li className={`step step-primary`} key={`s-${index}`}>
                          {s.title}
                        </li>
                      );
                    }
                    return (
                      <li
                        className={`step ${
                          step >= index + 1 ? "step-primary" : ""
                        }`}
                        key={`s-${index}`}
                      >
                        {s.title}
                      </li>
                    );
                  })}
                </ul>

                <form
                  className="mt-5"
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >
                  <div
                    className={`form-control w-full max-w-xs mb-5 ${
                      step === 1 ? "" : "hidden"
                    } `}
                  >
                    <span className="label-text">
                      <span className="text-error">*</span>
                      <span>username</span>
                    </span>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="lorem inpsum"
                      className="input input-bordered  w-full max-w-xs"
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.username}
                      </span>
                    </label>
                  </div>

                  <div
                    className={`form-control w-full max-w-xs mb-5 ${
                      step === 1 ? "" : "hidden"
                    } `}
                  >
                    <span className="label-text">
                      <span className="text-error">*</span>
                      <span>email</span>
                    </span>
                    <input
                      type="email"
                      placeholder="loreminpsum@gmail.com"
                      class="input input-bordered  w-full max-w-xs"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />

                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.email}
                      </span>
                    </label>
                  </div>

                  <div
                    className={`form-control w-full max-w-xs mb-5 ${
                      step === 1 ? "" : "hidden"
                    } `}
                  >
                    <span className="label-text">
                      <span className="text-error">*</span>
                      <span>password</span>
                    </span>
                    <input
                      type="password"
                      placeholder="********"
                      class="input input-bordered  w-full max-w-xs"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password}
                      </span>
                    </label>
                  </div>

                  <div
                    className={`form-control w-full max-w-xs mb-5 ${
                      step === 2 ? "" : "hidden"
                    } `}
                  >
                    <span className="label-text">
                      <span className="text-error">*</span>
                      <span>security question</span>
                    </span>

                    <select
                      className="select select-bordered w-full max-w-xs"
                      name="question"
                      defaultValue={data?.[0]?.content}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.question}
                    >
                      {data?.map((q) => (
                        <option value={q.content}>{q.content}</option>
                      ))}
                    </select>
                  </div>

                  <div
                    className={`form-control w-full max-w-xs mb-5 ${
                      step === 2 ? "" : "hidden"
                    } `}
                  >
                    <span className="label-text">
                      <span className="text-error">*</span>
                      <span>security answear</span>
                    </span>

                    <input
                      type="text"
                      placeholder="lorem inpsum"
                      class="input input-bordered  w-full max-w-xs"
                      name="answear"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.answear}
                    />

                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.answear}
                      </span>
                    </label>
                  </div>
                  <div
                    className={`form-control w-full max-w-xs mb-5 ${
                      step === 2 ? "" : "hidden"
                    } `}
                  >
                    <span className="label-text">
                      <span className="text-error">*</span>
                      <span>profile picture</span>
                    </span>

                    <input
                      type="file"
                      placeholder="lorem inpsum"
                      class="input input-bordered  w-full max-w-xs"
                      onChange={(e) => setPimg(e.target.files[0])}
                    />

                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.pmig}
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <button
                      type="submit"
                      className={`btn btn-success  ${
                        step === 2 ? "" : "hidden"
                      }  mr-4 ${isValid ? "" : "btn-disabled"}`}
                    >
                      register
                    </button>
                    {console.log(isValid)}
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className={`btn btn-primary  ${
                        step === 1 ? "" : "hidden"
                      }`}
                    >
                      next
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className={`btn btn-primary mr-auto ${
                        step === 2 ? "" : "hidden"
                      }`}
                    >
                      prev
                    </button>

                    <Link to="/forget-password" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <Link to="/login" className="text-secondary">
                      already have an account?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AuthenticatedWrapper>
  );
}

const registerSchema = yup.object({
  username: yup.string().required("username is required"),
  email: yup.string().email("email is invalid").required("email is required"),
  password: yup.string().required("password is required"),
  answear: yup.string().required("answear is required"),
  question: yup.string().required("question is required"),
});

const handleRegisterSubmit = async (values, cb, setLoading) => {
  const { username, email, password, answear, question } = values;
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("answear", answear);
    formData.append("question", question);
    formData.append("pimg", values?.pimg, values?.pimg.name);
    setLoading(true);
    const { data } = await HttpClient.post("/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setLoading(false);
    cb(data, null);
  } catch (error) {
    setLoading(true);
    cb(null, error);
    setLoading(false);
  }
};
