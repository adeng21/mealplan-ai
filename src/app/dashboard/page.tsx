import { db } from "@/db";
import { getUser } from "@/lib/kindeAuth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const user = getUser();
  const userNotAuthedOrCreated = async () => {
    return (
      !user ||
      !user.id ||
      !(await db.user.findFirst({ where: { id: user.id } }))
    );
  };

  if (await userNotAuthedOrCreated())
    redirect("/auth-callback?origin=dashboard");

  return <div>{user.email}</div>;
};
export default Dashboard;
