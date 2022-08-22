import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";
import Resource from "../../components/Resource";
import { useMemo } from "react";

export default function Location(props) {
  const router = useNavigate();

  const [users, setUsers] = useState([]);

  const [txt, setText] = useState("");

  const filters = useMemo(() => ["username", "email", "role"], []);

  const memoziedUsers = useMemo(() => {
    if (txt !== "") {
      return users.filter((l) => {
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
      return users;
    }
  }, [users, txt]);

  useEffect(() => {
    HttpClient.get("/admin/users")
      .then(({ data }) => {
        console.log(data);
        setUsers(data.data);
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
            columns={["_id", "username", "email", "role"]}
            data={memoziedUsers}
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
                  router(`/users/edit/${row._id}`, { replace: true });
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
                        setUsers(users.filter((u) => u?._id !== row?._id));
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
