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

  const [account, setAccount] = useState(null);

  const [toaster, setToaster] = useState({
    message: "",
    type: "",
    show: false,
  });

  useEffect(() => {
    if (id) {
      HttpClient.get(`/admin/accounts/${id}`)
        .then(({ data }) => {
          setAccount(data?.data);
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
            title="edit account"
            initialValues={{
              firstName: account?.firstName,
              lastName: account?.lastName,
              dateOfBirth: Momment(account?.dateOfBirth).format("YYYY-MM-DD"),
              addresse: account?.addresse,
              atmPin: "",
              nationalId: account?.nationalId,
              status: account?.status,
              balance: account?.balance,
            }}
            validationSchema={yup.object({
              firstName: yup.string().required(),
              lastName: yup.string().required(),
              dateOfBirth: yup.string().required(),
              addresse: yup.string().required(),
              atmPin: yup.string(),
              nationalId: yup.string().required(),
              balance: yup.number(),
              status: yup
                .string()
                .equals(["active", "active", "blocked", "pending"]),
            })}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                const { data } = await HttpClient.patch(
                  `/admin/accounts/${account?._id}`,
                  values
                );

                setToaster({
                  type: "alert-success",
                  show: true,
                  message: "sucessfully updated  account!",
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
                name: "firstName",
              },
              {
                type: "text",
                name: "lastName",
              },
              {
                type: "date",
                name: "dateOfBirth",
              },
              {
                type: "text",
                name: "addresse",
              },
              {
                type: "text",
                name: "nationalId",
              },
              {
                type: "text",
                name: "atmPin",
              },
              {
                type: "text",
                name: "status",
              },
              {
                type: "number",
                name: "balance",
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
