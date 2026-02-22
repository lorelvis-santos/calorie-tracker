import { useMemo, type Dispatch } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { Activity, Category } from "../types"
import { categories } from "../data/categories";
import type { ActivityActions } from "../reducers/activityReducer";

type ActivitiesListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
}

export const ActivitiesList = ({ activities, dispatch } : ActivitiesListProps) => {
  const categoryName = useMemo(() => {
    return (category: Category["id"]) => {
      return categories.find(x => x.id === category)?.name ?? ""
    }
  }, []);

  const isEmptyActivities = useMemo(() => activities.length === 0, [activities]);

  return (
    <>
      <h2 className="text-3xl font-bold text-slate-600 text-center">
        Comida y actividades
      </h2>

      {isEmptyActivities ? <p className="text-center mt-6">No hay actividades aún...</p> : 
        activities.map(activity => (
          <div 
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex flex-col md:flex-row gap-5 md:gap-0 justify-between rounded-lg shadow-md"
          >
            <div className="space-y-2 relative">
              <p 
                className={`absolute -top-6 -left-8 text-white font-bold uppercase px-10 py-2 shadow-sm rounded-md ${activity.category === 1 ? "bg-lime-500" : "bg-orange-500"}`}>
                {categoryName(activity.category)}
              </p>
              <p className="text-xl font-bold pt-5 mt-2">
                {activity.name}
              </p>
              <p className="font-bold text-2xl text-lime-500">
                {activity.calories} {''}
                <span>calorías</span>
              </p>
            </div>
            <div className="flex gap-2 align-top">
              <button 
                className="cursor-pointer h-8 w-8"
                onClick={() => dispatch({type: "set-currentId", payload: { id: activity.id}})}>
                <PencilSquareIcon 
                  className="text-sky-800 hover:text-sky-900 hover:scale-105 transition-all"
                />
              </button>

              <button 
                className="cursor-pointer h-8 w-8" 
                onClick={() => dispatch({type: "delete-activity", payload: { id: activity.id}})}>
                <TrashIcon 
                  className="text-red-800 hover:text-red-900 hover:scale-105 transition-all"
                />
              </button>
            </div>
          </div>
        )
      )}
    </>
  )
}