import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";
import Resource from "../../components/Resource";

export default function Urgents_(props) {
  const router = useNavigate();

  const [urgents, setUrgents] = useState([]);

  const [searchFilter, setSearchFilter] = useState("");

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
            columns={["_id", "content", "type", "viewed"]}
            data={urgents}
            onSelection={() => {}}
            rowsPerPage={10}
            onAdd={() => {
              router("/accounts/add", { replace: true });
            }}
            actions={[
              {
                title: "edit",
                icon: "edit",
                handler: (row) => {
                  router(`/users/${row._id}`, { replace: true });
                },
              },
              {
                title: "delete",
                icon: "times",
                color: "error",
                handler: (row) => {
                  if (window.confirm("are you sure ?")) {
                    HttpClient.delete(`/admin/users/${row._id}`)
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
