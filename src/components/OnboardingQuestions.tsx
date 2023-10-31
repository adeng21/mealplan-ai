"use client";
import { Badge } from "./ui/badge";
import { SERVING_SIZES } from "@/lib/constants";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { BadgeInfo } from "lucide-react";
import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { AllergyType, DietType } from "@prisma/client";

interface OnboardingQuestionProps {
  existingAllergies: AllergyType[];
  existingDiets: DietType[];
  existingServingSizes: number | undefined;
}

const OnboardingQuestions = ({
  existingAllergies,
  existingDiets,
  existingServingSizes,
}: OnboardingQuestionProps) => {
  // states
  const [selectedAllergies, setSelectedAllergies] =
    useState<AllergyType[]>(existingAllergies);
  const [selectedDiets, setSelectedDiets] = useState<DietType[]>(existingDiets);
  const [selectedServings, setSelectedServings] = useState<number>(
    existingServingSizes || 2
  );
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const router = useRouter();

  const toggleAllergy = (allergy: AllergyType) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter((a) => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const toggleDiet = (diet: DietType) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  const { mutate: saveUserPreferences } = trpc.saveUserPreferences.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error) => {
      setButtonLoading(false);
      toast({
        title: "Un oh. Something went wrong. Please try again",
        description: `${error.message}`,
        variant: "destructive",
      });
    },
  });

  const submitForm = () => {
    setButtonLoading(true);
    saveUserPreferences({
      allergies: selectedAllergies,
      diets: selectedDiets,
      servingSize: selectedServings,
    });
  };

  return (
    <div className="my-12">
      <h2 className="my-5 font-semibold text-xl">
        {" "}
        Do you have any allergies?
      </h2>
      <div className="my-12">
        {Object.values(AllergyType).map((allergy, idx) => (
          <Badge
            key={idx}
            onClick={() => toggleAllergy(allergy)}
            className="mx-3 p-2 cursor-pointer"
            variant={
              selectedAllergies.includes(allergy) ? "default" : "secondary"
            }
          >
            {allergy}
          </Badge>
        ))}
      </div>
      <h2 className="my-5 font-semibold text-xl">
        {" "}
        Do you follow any specific diets?
      </h2>
      <div className="my-12">
        {Object.values(DietType).map((diet, idx) => (
          <Badge
            key={idx}
            onClick={() => toggleDiet(diet)}
            className="mx-3 p-2 cursor-pointer"
            variant={selectedDiets.includes(diet) ? "default" : "secondary"}
          >
            {diet}
          </Badge>
        ))}
      </div>
      <h2 className="my-5 font-semibold text-xl">
        How many servings per meal?
      </h2>
      <div className="my-12">
        {SERVING_SIZES.map((serving, idx) => (
          <Badge
            key={idx}
            className="mx-3 p-2 cursor-pointer"
            variant={
              selectedServings === serving.value ? "default" : "secondary"
            }
            onClick={() => setSelectedServings(serving.value)}
          >
            {`${serving.value} servings`}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeInfo className="h-4 w-4 ml-2" />
                </TooltipTrigger>
                <TooltipContent>{serving.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Badge>
        ))}
      </div>
      <div className="my-12">
        {buttonLoading ? (
          <Button disabled>
            <ReloadIcon className="h-5 w-5 mr-2 animate-spin" /> Saving
            Preferences...
          </Button>
        ) : (
          <Button onClick={submitForm}>Save Preferences</Button>
        )}
      </div>
    </div>
  );
};
export default OnboardingQuestions;
