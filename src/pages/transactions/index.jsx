import Layout from "../../components/Layout";
import Resource from "./resource";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthGuard } from "../../wrappers/Auth";

export default function Location(props) {
  const router = useNavigate();
  const [transactions, settransactions] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(
    () =>
      async function fetchData() {
        try {
          const data = await axios.get(
            "http://localhost:4000/api/transactions"
          );
          await settransactions(data.data);
          console.log("Sucesss retriving data");
        } catch (error) {
          console.log(error);
        }
      },
    []
  );

  return (
    <AuthGuard>
      <Layout>
        <div className="mt-4">
          <Resource
            transactions={transactions}
            changeWord={(word) => setSearchFilter(word)}
            onEdit={() => {}}
            onDelete={() => {}}
            title="Transactions"
            columns={[
              "Transaction_ID",
              "Transaction_Status",
              "Type",
              "Sender",
              "Sender_Username",
              "Receiver",
              "Receiver_Username",
              "Amount",
            ]}
            rowsPerPage={10}
            actions={
              [
                // {
                //   title: "Edit",
                //   icon: "edit",
                //   handler: (item) => {
                //     console.log(item);
                //   },
                //   tooltip: "Edit",
                // },
                // {
                //   title: "Delete",
                //   icon: "trash",
                //   handler: (item) => {
                //     console.log(item);
                //   },
                //   tooltip: "Delete",
                //   color: "error",
                // },
              ]
            }
            data={transactions
              .filter((transaction) => {
                console.log(searchFilter);
                if (searchFilter == "") return transaction;
                //else if( transaction.ReceiverId.toLowerCase().startsWith(searchFilter.toLowerCase()))
                else if (
                  JSON.stringify(transaction)
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
                )
                  return transaction;
              })
              .map((transaction, key) => {
                return {
                  Transaction_ID: (
                    <Link key={key} to="/locations">
                      {transaction._id}
                    </Link>
                  ),
                  Transaction_Status: transaction.status,
                  Type: transaction.type,
                  Sender: (
                    <Link to="/locations">{transaction.SenderId._id}</Link>
                  ),
                  Sender_Username: transaction.SenderId.username,
                  Receiver: (
                    <Link to="/locations">{transaction.ReceiverId._id}</Link>
                  ),
                  Receiver_Username: transaction.ReceiverId.username,
                  Amount: transaction.amount,
                };
              })}
          />
        </div>
      </Layout>
    </AuthGuard>
  );
}
