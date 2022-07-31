import Layout from "../../components/Layout";
import Resource from "../../components/Resource";
import { useNavigate } from "react-router-dom";
export default function Location(props) {
  const router = useNavigate();
  return (
    <Layout>
      <div className="mt-4">
        <Resource
          onAdd={() => {
            router("/locations/add");
          }}
          onEdit={() => {}}
          onDelete={() => {}}
          title="Location"
          columns={["id", "title", "x", "y"]}
          rowsPerPage={10}
          actions={[
            {
              title: "Edit",
              icon: "edit",
              handler: (item) => {
                console.log(item);
              },
              tooltip: "Edit",
            },
            {
              title: "Delete",
              icon: "trash",
              handler: (item) => {
                console.log(item);
              },
              tooltip: "Delete",
              color: "error",
            },
          ]}
          data={[
            {
              id: 1,
              title: "Location 1",
              x: 1,
              y: 1,
            },
            {
              id: 2,
              title: "Location 2",
              x: 2,
              y: 2,
            },
          ]}
        />
      </div>
    </Layout>
  );
}
