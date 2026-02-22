import { useEffect, useReducer, useMemo } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivitiesList } from "./components/ActivitiesList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  const canRestart = useMemo(() => state.activities.length > 0, [state.activities])

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <>
      <header className="bg-lime-600 py-3 px-5">
        <div className="max-w-5xl mx-auto flex justify-between gap-2 items-center">
          <h1 className="md:text-center text-xl font-bold text-white uppercase">
            Contador de Calorías
          </h1>

          <button 
            className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercarse text-white cursor-pointer transition-colors rounded-lg text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!canRestart}
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <Form
            state={state}
            dispatch={dispatch}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivitiesList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
