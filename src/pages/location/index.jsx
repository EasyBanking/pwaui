import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";
import Resource from "../../components/Resource";

export default function Location(props) {
  const router = useNavigate();

  const [locations, setlocations] = useState([]);

  const [txt, setText] = useState("");

  const filters = useMemo(() => ["address", "latitude", "longitude"], []);

  const memoziedLocations = useMemo(() => {
    if (txt !== "") {
      return locations.filter((l) => {
        let status = false;

        for (let i in filters) {
          const f = String(l[filters[i]]);

          console.log();

          if (f.toLowerCase().includes(txt.toLowerCase())) {
            status = true;
          }
        }

        return status;
      });
    } else {
      return locations;
    }
  }, [locations, txt]);

  useEffect(() => {
    HttpClient.get("/locations")
      .then(({ data }) => {
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
            data={memoziedLocations}
            onSearch={(e) => {
              const text = e.target.value;
              setText(text);
            }}
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
                  router(`/locations/edit/${row._id}`, { replace: true });
                },
              },
              {
                title: "delete",
                icon: "times",
                color: "error",
                handler: (row) => {
                  if (window.confirm("are you sure ?")) {
                    HttpClient.delete(`/admin/location/${row._id}`)
                      .then((res) => {
                        console.log(res);

                        setlocations(
                          locations.filter((l, i) => l?._id !== row?._id)
                        );
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
