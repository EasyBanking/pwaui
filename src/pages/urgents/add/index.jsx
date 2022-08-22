import FormBuilder from "../../../components/FormBuilder";
import Layout from "../../../components/Layout";
import { AuthGuard } from "../../../wrappers/Auth";
import * as yup from "yup";
import { useState } from "react";
import HttpClient from "../../../Http-Client";

const AddUrgent = (props) => {
  const [loading, setLoading] = useState(false);
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  return (
    <AuthGuard>
      <Layout>
        <FormBuilder
          alert={toaster}
          setAlert={setToaster}
          isLoading={loading}
          title="new Urgent Message"
          initialValues={{
            content: "",
            type: "info",
            account: "",
          }}
          validationSchema={yup.object({
            content: yup.string().required(),
            type: yup.string().required(),
            account: yup.string().required(),
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const { data } = await HttpClient.post(
                `/admin/urgents/${values?.account}`,
                {
                  content: values.content,
                  type: values.type,
                }
              );

              setToaster({
                type: "alert-success",
                show: true,
                message: "sucessfully created a new urgent !",
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
            {
              type: "text",
              name: "account",
              placeholder: "3232364540adqrqe",
            },
          ]}
        />
      </Layout>
    </AuthGuard>
  );
};

export default AddUrgent;
