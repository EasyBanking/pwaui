import Layout from "../../components/Layout";
import Resource from "./resource";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";

export default function Location(props) {
  const router = useNavigate();
  const [transactions, settransactions] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    HttpClient.get("/transactions")
      .then((data) => {
        settransactions(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
              "Sender_Name",
              "Receiver_Name",
              "Amount",
            ]}
            rowsPerPage={10}
            actions={[]}
            data={transactions
              .filter((transaction) => {
                console.log(searchFilter);
                if (searchFilter == "") return transaction;
                else if (
                  JSON.stringify(transaction)
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
                )
                  return transaction;
              })

              .map((transaction, key) => {
                return {
                  Transaction_ID: <Link to="/accounts">{transaction?._id}</Link>,
                  Transaction_Status: transaction?.status,
                  Type: transaction?.type,
                  Sender: <Link to="/accounts">{transaction?.sender?._id}</Link>,
                  Sender_Name: transaction?.sender?.firstName,
                  Receiver_Name: transaction?.receiver?.firstName,
                  Amount: transaction?.amount,
                };
              })}
          />
        </div>
      </Layout>
    </AuthGuard>
  );
}
