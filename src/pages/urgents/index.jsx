import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";
import Resource from "../../components/Resource";
import { useMemo } from "react";

export default function Urgents_(props) {
  const router = useNavigate();

  const [urgents, setUrgents] = useState([]);

  const [txt, setText] = useState("");

  const filters = useMemo(() => ["content", "type", "viewed"], []);

  const memoziedUrgents = useMemo(() => {
    if (txt !== "") {
      return urgents.filter((l) => {
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
      return urgents;
    }
  }, [urgents, txt]);

  useEffect(() => {
    HttpClient.get("/admin/urgents")
      .then(({ data }) => {
        console.log(data);
        setUrgents(data.urgents);
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
            onSearch={(e) => {
              setText(e.target.value);
            }}
            columns={["_id", "content", "type", "viewed"]}
            data={memoziedUrgents}
            onSelection={() => {}}
            rowsPerPage={10}
            onAdd={() => {
              router("/urgents/add", { replace: true });
            }}
            actions={[
              {
                title: "edit",
                icon: "edit",
                handler: (row) => {
                  router(`/urgents/edit/${row._id}`, { replace: true });
                },
              },
              {
                title: "delete",
                icon: "times",
                color: "error",
                handler: (row) => {
                  if (window.confirm("are you sure ?")) {
                    HttpClient.delete(`/admin/urgents/${row._id}`)
                      .then((res) => {
                        setUrgents(
                          urgents?.filter((l, i) => l?._id !== row?._id)
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
