import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";
import Resource from "../../components/Resource";
import { useMemo } from "react";

export default function Contacts(props) {
  const router = useNavigate();

  const [contacts, setContacts] = useState([]);

  const [txt, setText] = useState("");

  const filters = useMemo(() => ["subject", "email", "message"], []);

  const memoziedUrgents = useMemo(() => {
    if (txt !== "") {
      return contacts.filter((l) => {
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
      return contacts;
    }
  }, [contacts, txt]);

  useEffect(() => {
    HttpClient.get("/admin/contact")
      .then(({ data }) => {
        console.log(data);
        setContacts(data);
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
            columns={["_id", "email", "subject", "message"]}
            data={memoziedUrgents}
            onSelection={() => {}}
            rowsPerPage={10}
            actions={[
              {
                title: "edit",
                icon: "edit",
                handler: (row) => {
                  router(`/contact/edit/${row._id}`, { replace: true });
                },
              },
              {
                title: "delete",
                icon: "times",
                color: "error",
                handler: (row) => {
                  if (window.confirm("are you sure ?")) {
                    HttpClient.delete(`/admin/contact/${row._id}`)
                      .then((res) => {
                        setContacts(
                          contacts?.filter((l, i) => l?._id !== row?._id)
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
