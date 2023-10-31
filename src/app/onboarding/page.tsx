import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { db } from "@/db";
import { getUser } from "@/lib/kindeAuth";
import { redirect } from "next/navigation";
import OnboardingQuestions from "@/components/OnboardingQuestions";

const Page = async () => {
  const user = getUser();
  const userNotAuthedOrCreated = async () => {
    return (
      !user ||
      !user.id ||
      !(await db.user.findFirst({ where: { id: user.id } }))
    );
  };

  if (await userNotAuthedOrCreated())
    redirect("/auth-callback?origin=onboarding");

  const existingUserAllergies = await db.userAllergy.findMany({
    where: { userId: user.id! },
    select: { allergyType: true },
  });
  const existingUserDiets = await db.userDiet.findMany({
    where: { userId: user.id! },
    select: { dietType: true },
  });

  const existingServingSizes = await db.user.findFirst({
    where: { id: user.id! },
    select: { servingSize: true },
  });

  return (
    <MaxWidthWrapper>
      <div className="flex items-center my-6">
        <h1 className="font-bold text-3xl">
          Let's get to know your preferences...
        </h1>
      </div>
      <OnboardingQuestions
        existingAllergies={existingUserAllergies.map((a) => a.allergyType)}
        existingDiets={existingUserDiets.map((d) => d.dietType)}
        existingServingSizes={existingServingSizes?.servingSize}
      />
    </MaxWidthWrapper>
  );
};
export default Page;
