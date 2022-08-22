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
  const [urgent, setUrgent] = useState(null);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    if (id) {
      HttpClient.get(`/admin/urgents/${id}`)
        .then(({ data }) => {
          setUrgent(data?.urgents);
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
            title="edit urgent"
            initialValues={{
              content: urgent?.content,
              type: urgent?.type,
            }}
            validationSchema={yup.object({
              content: yup.string().required(),
              type: yup.string().required(),
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                const { data } = await HttpClient.patch(
                  `/admin/urgents/${urgent?._id}`,
                  values
                );

                setToaster({
                  type: "alert-success",
                  show: true,
                  message: "sucessfully updated  a urgent!",
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
                name: "content",
                placeholder: "update your information please! ",
              },
              {
                type: "select",
                name: "type",
                placeholder: "urgently required",
                options: ["info", "warning", "danger", "urgent"],
                defaultValue: "info",
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
