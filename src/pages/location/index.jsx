import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";
import Resource from "../../components/Resource";

export default function Location(props) {
  const router = useNavigate();

  const [locations, setlocations] = useState([]);

  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    HttpClient.get("/locations")
      .then(({ data }) => {
        console.log(data);
        setlocations(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AuthGuard>
      <Layout>
        <div className="mt-4 min-h-screen">
          <Resource
            columns={["_id", "address", "latitude", "longitude"]}
            data={locations}
            onSelection={() => {}}
            rowsPerPage={10}
            onAdd={() => {
              router("/locations/add", { replace: true });
            }}
            actions={[
              {
                title: "edit",
                icon: "edit",
                handler: (row) => {
                  router(`/locations/${row._id}`, { replace: true });
                },
              },
              {
                title: "delete",
                icon: "times",
                color: "error",
                handler: (row) => {
                  if (window.confirm("are you sure ?")) {
                    HttpClient.delete(`/admin/locations/${row._id}`)
                      .then((res) => {
                        console.log(res);
                      })
                      .catch(console.log);
                  }
                },
              },
            ]}
          />
        </div>
      </Layout>
    </AuthGuard>
  );
}
