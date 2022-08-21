import { Grid, Text } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "../../components/Layout";
import { AuthGuard } from "../../wrappers/Auth";
import { useSelector } from "react-redux";

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
    stats: "12",
    title: "Transactions",
    icon: "list-check",
  },
  {
    stats: "12",
    title: "Payments",
    icon: "money-bill",
  },
  {
    stats: "12",
    title: "Accounts",
    icon: "user-circle",
  },
  {
    stats: "12",
    title: "Users",
    icon: "users",
  },
];

export default function Dashboard() {
  const user = useSelector((state) => state?.auth?.user);
  return (
    <AuthGuard>
      <Layout>
        <section className="px-6 flex mt-2">
          <Grid.Container gap={2}>
            {stats.map((i, x) => {
              return (
                <ResoruceWidge icon={i.icon} title={i.title} stats={i.stats} />
              );
            })}
          </Grid.Container>
        </section>
      </Layout>
    </AuthGuard>
  );
}
