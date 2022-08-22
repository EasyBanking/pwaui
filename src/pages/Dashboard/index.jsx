import { Grid, Text } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/Layout";
import { AuthGuard } from "../../wrappers/Auth";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import HttpClient from "../../Http-Client";
import { useState } from "react";
import { LoaderWrapper } from "../../components/Loader";

const ResoruceWidge = (props) => {
  const { stats, title, icon } = props;

  return (
    <Grid md={3} xs={6}>
      <div className="flex flex-row items-center bg-white w-10/12 rounded-md p-4">
        <FontAwesomeIcon icon={icon} size="2x" className="text-primary" />
        <div className="ml-2">
          <Text h4>{stats}</Text>
          <Text>{title}</Text>
        </div>
      </div>
    </Grid>
  );
};

const stats = [
  {
    title: "transactions",
    icon: "list-check",
  },
  {
    title: "payments",
    icon: "money-bill",
  },
  {
    title: "accounts",
    icon: "user-circle",
  },
];

export default function Dashboard() {
  const user = useSelector((state) => state?.auth?.user);
  const [counters, setCounters] = useState({});
  const [countersLoad, setCountersLoad] = useState(false);

  useEffect(() => {
    HttpClient.get("/counters").then(({ data }) => {
      setCounters(data?.counters);
      setCountersLoad(true);
    });
  }, []);
  return (
    <AuthGuard>
      <Layout>
        {countersLoad ? (
          <section className="px-6 flex mt-2 min-h-screen">
            <div className="w-full">
              <Grid.Container gap={2}>
                {Object?.keys(counters)?.map((i, x) => {
                  return (
                    <ResoruceWidge
                      icon={"info"}
                      title={i}
                      stats={counters[i]}
                    />
                  );
                })}
              </Grid.Container>
            </div>
          </section>
        ) : (
          <LoaderWrapper />
        )}
      </Layout>
    </AuthGuard>
  );
}
