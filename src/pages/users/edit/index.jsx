import FormBuilder from "../../../components/FormBuilder";
import Layout from "../../../components/Layout";
import { AuthGuard } from "../../../wrappers/Auth";
import * as yup from "yup";
import { useState } from "react";
import HttpClient from "../../../Http-Client";
import Momment from "moment";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderWrapper } from "../../../components/Loader";

const EditLoaction = (props) => {
  const [loading, setLoading] = useState(false);

  const [loadData, setLoadData] = useState(false);

  const { id } = useParams();

  const router = useNavigate();

  const [user, setUser] = useState(null);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    if (id) {
      HttpClient.get(`/admin/users/${id}`)
        .then(({ data }) => {
          setUser(data?.data);
          setLoadData(true);
        })
        .catch((err) => {
          console.log(err);
          router("/error", { replace: true });
        });
    }
  }, [id]);

  return (
    <AuthGuard>
      <Layout>
        {loadData ? (
          <FormBuilder
            alert={toaster}
            setAlert={setToaster}
            isLoading={loading}
            title="edit user"
            initialValues={{
              username: user?.username,
              email: user?.email,
              password: "",
              question: user?.security?.question,
              answear: user?.security?.answer,
              isAcitive: user?.isAcitive,
              role: user?.role,
            }}
            validationSchema={yup.object({
              username: yup.string().min(5).max(55).required(),
              email: yup.string().min(5).max(55).required(),
              password: yup.string().min(5).max(55),
              question: yup.string().min(5).max(255).required(),
              answear: yup.string().min(2).max(255).required(),
              isAcitive: yup.boolean().required(),
              role: yup.string().equals(["ADMIN", "USER"]).required(),
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                const { data } = await HttpClient.patch(
                  `/admin/users/${user?._id}`,
                  values
                );

                setToaster({
                  type: "alert-success",
                  show: true,
                  message: "sucessfully updated  user!",
                });

                setLoading(false);
              } catch (err) {
                setToaster({
                  type: "alert-error",
                  message: err?.response?.data?.message || err?.message,
                  show: true,
                });
                setLoading(false);
              }
            }}
            fields={[
              {
                type: "text",
                name: "username",
              },
              {
                type: "text",
                name: "email",
              },
              {
                type: "password",
                name: "password",
              },
              {
                type: "text",
                name: "question",
              },
              {
                type: "text",
                name: "answear",
              },
              {
                type: "checkbox",
                name: "isAcitive",
              },
              {
                type: "text",
                name: "role",
              },
            ]}
          />
        ) : (
          <LoaderWrapper />
        )}
      </Layout>
    </AuthGuard>
  );
};

export default EditLoaction;
