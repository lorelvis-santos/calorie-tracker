import { useMemo } from "react";
import type { Activity, Category } from "../types"
import { categories } from "../data/categories";

type ActivitiesListProps = {
  activities: Activity[];
}

export const ActivitiesList = ({ activities } : ActivitiesListProps) => {
  const categoryName = useMemo(() => {
    return (category: Category["id"]) => {
      return categories.find(x => x.id === category)?.name ?? ""
    }
  }, []);

  return (
    <>
      <h2 className="text-3xl font-bold text-slate-600 text-center">
        Comida y actividades
      </h2>

      {activities.map(activity => (
        <div 
          key={activity.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between"
        >
          <div className="space-y-2 relative">
            <p>
              {categoryName(activity.category)}
            </p>
            <p className="text-xl font-bold pt-5">
              {activity.name}
            </p>
            <p className="font-bold text-2xl text-lime-500">
              {activity.calories} {''}
              <span>calorías</span>
            </p>
          </div>
          <div>

          </div>
        </div>
      ))}
    </>
  )
}