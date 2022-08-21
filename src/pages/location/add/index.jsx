import FormBuilder from "../../../components/FormBuilder";
import Layout from "../../../components/Layout";
import { AuthGuard } from "../../../wrappers/Auth";

const AddLoaction = (props) => {
  return (
    <AuthGuard>
      <Layout>
        <FormBuilder
          title="new location"
          fields={[
            {
              type: "text",
              name: "test",
              placeholder: "some place holder",
            },
            {
              type: "email",
              name: "test2",
              placeholder: "some place holder",
            },
          ]}
        />
      </Layout>
    </AuthGuard>
  );
};

export default AddLoaction;
