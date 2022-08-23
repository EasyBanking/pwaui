import FormBuilder from "../../../components/FormBuilder";
import Layout from "../../../components/Layout";
import { AuthGuard } from "../../../wrappers/Auth";
import * as yup from "yup";
import { useState } from "react";
import HttpClient from "../../../Http-Client";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderWrapper } from "../../../components/Loader";
const AddLoaction = (props) => {
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const { id } = useParams();
  const router = useNavigate();
  const [contactMsg, setContactMsg] = useState(null);
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    if (id) {
      HttpClient.get(`/admin/contact/${id}`)
        .then(({ data }) => {
          console.log(data);
          setContactMsg(data);
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
            title="edit contact message"
            initialValues={{
              subject: contactMsg?.subject,
              email: contactMsg?.email,
              message: contactMsg?.message,
            }}
            validationSchema={yup.object({
              subject: yup.string().required(),
              email: yup.string().required(),
              message: yup.string().required(),
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                const { data } = await HttpClient.patch(
                  `/admin/contact/${contactMsg?._id}`,
                  values
                );

                setToaster({
                  type: "alert-success",
                  show: true,
                  message: "sucessfully updated an contact!",
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
                name: "subject",
              },
              {
                type: "text",
                name: "message",
              },
              {
                type: "email",
                name: "email",
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

export default AddLoaction;
