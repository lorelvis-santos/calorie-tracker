import { useMemo } from "react";
import CalorieDisplay from "./CalorieDisplay";
import { useActivity } from "../hooks/useActivity";

export default function CalorieTracker() {
  const {state} = useActivity();
  const consumedCalories = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities]);

  const burnedCalories = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities]);

  const netCalories = useMemo(() => consumedCalories - burnedCalories, [consumedCalories, burnedCalories])

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de calorías</h2>

      <div className="flex flex-col items-center md:flex-row md: justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={consumedCalories}
          text="Consumidas"
        />
        <CalorieDisplay
          calories={burnedCalories}
          text="Quemadas"
        />
        <CalorieDisplay
          calories={netCalories}
          text="Diferencia"
        />
      </div>
    </>
  )
}