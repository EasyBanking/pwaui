import Layout from "../../components/Layout";
import Resource from "./resource";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Location(props) {
  const router = useNavigate();
  const [schedules, setschedules] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [filters, setFilters] = useState([]);

  useEffect(
    () =>
      async function fetchData() {
        try {
          const data = await axios.get("http://localhost:4000/api/schedule");
          await setschedules(data.data);
          console.log("Sucesss retriving Schedule data");
        } catch (error) {
          console.log(error);
        }
      },
    []
  );
  useEffect(() => {
    if (filters) {
      //console.log(filters)
    }
  }, filters);

  return (
    <Layout>
      <div className="mt-4">
        <Resource
          schedule={schedules}
          send_filters={(filters) => setFilters(filters)}
          changeWord={(word) => setSearchFilter(word)}
          onEdit={(row) => {
            console.log(row);
          }}
          onDelete={() => {}}
          title="Schedule"
          columns={["UserId", "Username", "Location", "Datetime", "Priority"]}
          rowsPerPage={10}
          actions={[
            {
              title: "Edit",
              icon: "edit",
              handler: (item) => {
                // console.log(item);
              },
              tooltip: "Edit",
            },
            {
              title: "Delete",
              icon: "trash",
              handler: (item) => {
                //remove item from schedule
                // setschedules(
                //   schedules.filter((sched) => sched._id !== item._id)
                //   //(schedule) => schedule.UserId._id != item.UserId._id
                // );
                // //console.log(schedules);
                console.log(schedules);
                console.log(item.data);
              },

              tooltip: "Delete",
              color: "error",
            },
          ]}
          data={schedules
            .filter((sched) => {
              console.log(searchFilter);
              if (searchFilter == "") return sched;
              //else if( transaction.ReceiverId.toLowerCase().startsWith(searchFilter.toLowerCase()))
              else if (
                JSON.stringify(sched)
                  .toLowerCase()
                  .includes(searchFilter.toLowerCase())
              )
                return sched;
            })
            .map((sched, key) => {
              return {
                //         "UserId": "1684",
                // "Location": "Location 1",
                // "Datetime": "2022-08-09T12:02:40.323Z",
                // "Priority": "5"
                UserId: (
                  <Link key={key} to="/locations">
                    {sched.UserId._id}
                  </Link>
                ),
                Username: sched.UserId.username,
                Location: sched.Location,
                Datetime: sched.Datetime,
                Priority: <Link to="/locations">{sched.Priority}</Link>,
              };
            })}
        />
      </div>
    </Layout>
  );
}
