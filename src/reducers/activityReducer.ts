import type { Activity } from "../types"

export type ActivityActions = 
  { type: "save-activity", payload: { newActivity: Activity } } |
  { type: "set-currentId", payload: { id: Activity["id"]} } |
  { type: "delete-activity", payload: {id: Activity["id"]}} |
  { type: "restart-app" }

export type ActivityState = {
  activities: Activity[],
  currentId: Activity["id"] | null
}

const getActivities = () : Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
}

export const initialState : ActivityState = {
  activities: getActivities(),
  currentId: null
}

export const activityReducer = (
  state : ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    // Este es el código que va a modificar el state
    let newActivities : Activity[] = [];

    if (state.currentId) {
      newActivities = state.activities.map(activity => activity.id === state.currentId ? action.payload.newActivity : activity);
    } else {
      newActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: newActivities,
      currentId: null
    }
  }

  if (action.type === "set-currentId") {
    return {
      ...state,
      currentId: action.payload.id
    }
  }

  if (action.type === "delete-activity") {
    return {
      ...state,
      activities: state.activities.filter(activity => activity.id !== action.payload.id)
    }
  }

  if (action.type === "restart-app") {
    localStorage.removeItem("activities");
    
    return {
      activities: [],
      currentId: null
    }
  }

  return state;
}