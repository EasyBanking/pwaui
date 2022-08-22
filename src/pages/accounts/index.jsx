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

  const [accounts, setAccounts] = useState([]);

  const [txt, setText] = useState("");

  const filters = useMemo(() => ["firstName", "lastName",'dateOfBirth','addresse'], []);

  const memoziedAccounts = useMemo(() => {
    if (txt !== "") {
      return accounts.filter((l) => {
        let status = false;

        for (let i in filters) {
          const f = String(l[filters[i]]);

          if (f.toLowerCase().includes(txt.toLowerCase())) {
            status = true;
          }
        }

        return status;
      });
    } else {
      return accounts;
    }
  }, [accounts, txt]);

  useEffect(() => {
    HttpClient.get("/admin/accounts")
      .then(({ data }) => {
        setAccounts(data.data);
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
            onSearch={(e) => setText(e.target.value)}
            columns={["firstName", "lastName", "addresse", "dateOfBirth"]}
            data={memoziedAccounts}
            onSelection={() => {}}
            rowsPerPage={10}
            actions={[
              {
                title: "edit",
                icon: "edit",
                handler: (row) => {
                  router(`/accounts/edit/${row._id}`, { replace: true });
                },
              },
              {
                title: "delete",
                icon: "times",
                color: "error",
                handler: (row) => {
                  if (window.confirm("are you sure ?")) {
                    HttpClient.delete(`/admin/accounts/${row._id}`)
                      .then((res) => {
                        setAccounts(
                          accounts?.filter((l, i) => l?._id !== row?._id)
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
