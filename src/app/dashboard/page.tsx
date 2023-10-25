import { getUser } from "@/lib/kindeAuth";

const Dashboard = () => {
  const user = getUser();
  return <div>{user.email}</div>;
};
export default Dashboard;
