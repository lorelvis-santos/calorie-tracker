import { createContext, useReducer, type ReactNode } from "react";
import { activityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activityReducer";

type ActivityProviderProps = {
    children: ReactNode;
}

type ActivityContextProps = {
    state: ActivityState;
    dispatch: React.Dispatch<ActivityActions>;
}

/* eslint-disable react-refresh/only-export-components */
export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState);

    return (
        <ActivityContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}