import Layout from "../../components/Layout";
import Resource from "./resource";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";

export default function Location(props) {
  const router = useNavigate();
  const [payments, setpayments] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    HttpClient.get("/admin/payment")
      .then((data) => {
        setpayments(data.data);
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
            payments={payments}
            changeWord={(word) => setSearchFilter(word)}
            onEdit={() => {}}
            onDelete={(item) => {
              console.log(item);
            }}
            title="Payments"
            columns={[
              "PaymentId",
              "status",
              "Sender",
              "Receiver",
              "Amount",
              "datetime",
            ]}
            rowsPerPage={10}
            actions={[]}
            data={payments
              .filter((payment) => {
                console.log(searchFilter);
                if (searchFilter == "") return payment;
                //else if( transaction.ReceiverId.toLowerCase().startsWith(searchFilter.toLowerCase()))
                else if (
                  JSON.stringify(payment)
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
                )
                  return payment;
              })
              .map((payment, key) => {
                return {
                  PaymentId: (
                    <Link key={key} to="/locations">
                      {payment._id}
                    </Link>
                  ),
                  status: payment.status,
                  Sender: <Link to="/locations">{payment.sender}</Link>,
                  Receiver: <Link to="/locations">{payment.receiver}</Link>,
                  Amount: payment.amount,
                  datetime: payment.datetime,
                };
              })}
          />
        </div>
      </Layout>
    </AuthGuard>
  );
}
