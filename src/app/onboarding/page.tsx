import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { db } from "@/db";
import { getUser } from "@/lib/kindeAuth";
import { redirect } from "next/navigation";
import { ALLERGY_TYPES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
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

  return (
    <MaxWidthWrapper>
      <div className="flex items-center my-6">
        <h1 className="font-bold text-3xl">
          Let's get to know your preferences...
        </h1>
      </div>
      <OnboardingQuestions />
    </MaxWidthWrapper>
  );
};
export default Page;
