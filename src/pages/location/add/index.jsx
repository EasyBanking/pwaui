import FormBuilder from "../../../components/FormBuilder";
import Layout from "../../../components/Layout";

const AddLoaction = (props) => {
  return (
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
  );
};

export default AddLoaction;
