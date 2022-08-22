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
  const [location, setLocation] = useState(null);
  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    if (id) {
      HttpClient.get(`/admin/location/${id}`)
        .then(({ data }) => {
          setLocation(data.location);
          console.log(data);
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
            title="edit location"
            initialValues={{
              address: location?.address,
              latitude: location?.latitude,
              longitude: location?.longitude,
            }}
            validationSchema={yup.object({
              address: yup.string().required(),
              latitude: yup.number().required(),
              longitude: yup.number().required(),
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                const { data } = await HttpClient.patch(
                  `/admin/location/${location?._id}`,
                  values
                );

                setToaster({
                  type: "alert-success",
                  show: true,
                  message: "sucessfully updated a new location!",
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
        ) : (
          <LoaderWrapper />
        )}
      </Layout>
    </AuthGuard>
  );
};

export default AddLoaction;
