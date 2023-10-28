"use client";
import { Badge } from "./ui/badge";
import { ALLERGY_TYPES, DIET_TYPES } from "@/lib/constants";
import { useState } from "react";

const OnboardingQuestions = () => {
  // states
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  const toggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter((a) => a !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const toggleDiet = (diet: string) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  return (
    <div className="my-6">
      <h2 className="my-3 font-semibold text-xl">
        {" "}
        Do you have any allergies?
      </h2>
      <div className="my-6">
        {ALLERGY_TYPES.map((allergy, idx) => (
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
      <h2 className="my-3 font-semibold text-xl">
        {" "}
        Do you follow any specific diets?
      </h2>
      <div className="my-6">
        {DIET_TYPES.map((diet, idx) => (
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
    </div>
  );
};
export default OnboardingQuestions;
