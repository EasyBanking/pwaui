import FormBuilder from "../../../components/FormBuilder";
import Layout from "../../../components/Layout";
import { AuthGuard } from "../../../wrappers/Auth";
import * as yup from "yup";
import { useState } from "react";
import HttpClient from "../../../Http-Client";
const AddLoaction = (props) => {
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
          title="new location"
          initialValues={{
            address: "",
            latitude: "",
            longitude: "",
          }}
          validationSchema={yup.object({
            address: yup.string().required(),
            latitude: yup.number().required(),
            longitude: yup.number().required(),
          })}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const { data } = await HttpClient.post(
                "/admin/location",
                values
              );

              setToaster({
                type: "alert-success",
                show: true,
                message: "sucessfully created a new location!",
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
              name: "address",
              placeholder: "cairo / egypt ",
            },
            {
              type: "text",
              name: "latitude",
              placeholder: "32.0354",
            },
            {
              type: "text",
              name: "longitude",
              placeholder: "32.0354",
            },
          ]}
        />
      </Layout>
    </AuthGuard>
  );
};

export default AddLoaction;
