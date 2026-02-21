import type { Activity } from "../types"

export type ActivityActions = 
  { type: "save-activity", payload: { newActivity: Activity } } |
  { type: "set-currentId", payload: { id: Activity["id"]} }

type ActivityState = {
  activities: Activity[],
  currentId: Activity["id"] | null
}

export const initialState : ActivityState = {
  activities: [],
  currentId: null
}

export const activityReducer = (
  state : ActivityState = initialState,
  action: ActivityActions
) => {
  if (action.type === "save-activity") {
    // Este es el código que va a modificar el state
    return {
      ...state,
      activities: [...state.activities, action.payload.newActivity]
    }
  }

  if (action.type === "set-currentId") {
    return {
      ...state,
      currentId: action.payload.id
    }
  }

  return state;
}