import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthGuard } from "../../wrappers/Auth";
import HttpClient from "../../Http-Client";
import Resource from "./resource";

export default function Location(props) {
  const router = useNavigate();

  const [schedules, setSchedules] = useState([]);

  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    HttpClient.get("/schedule")
      .then((data) => {
        console.log(data);
        const scd = data?.data;
        const faltten = [];

        for (let i = 0; i < scd?.length; i++) {
          faltten[i] = scd[i]?.schedules;
        }

        const final_data = faltten.flat().map((f, i) => ({
          ...f,
          user_id: scd[i]?._id,
          name: scd[i]?.firstName,
        }));

        setSchedules(final_data);
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
            transactions={schedules}
            changeWord={(word) => setSearchFilter(word)}
            onEdit={() => {}}
            onDelete={() => {}}
            title="Schedules"
            columns={[
              "UserID",
              "Username",
              "ID",
              "Type",
              "LocationID",
              "Priority",
            ]}
            rowsPerPage={10}
            actions={[]}
            data={schedules
              .filter((schedule) => {
                console.log(searchFilter);
                if (searchFilter == "") return schedule;
                else if (
                  JSON.stringify(schedule)
                    .toLowerCase()
                    .includes(searchFilter.toLowerCase())
                )
                  return schedule;
              })

              .map((schedule, key) => {
                return {
                  UserID: <Link to="/accounts">{schedule.user_id}</Link>,
                  Username: schedule.name,
                  ID: schedule._id,
                  Type: schedule.type,
                  Date: schedule.date,
                  LocationID: (
                    <Link to="/locations">{schedule.location_id}</Link>
                  ),
                  Priority: schedule.priority,
                };
              })}
          />
        </div>
      </Layout>
    </AuthGuard>
  );
}