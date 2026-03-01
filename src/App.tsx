import { useEffect, useMemo } from "react";
import Form from "./components/Form";
import { ActivitiesList } from "./components/ActivitiesList";
import CalorieTracker from "./components/CalorieTracker";
import { useActivity } from "./hooks/useActivity";

function App() {
  const { state, dispatch } = useActivity()
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
          <Form />
        </div>
      </section>

      <section className="bg-gray-800 py-10 px-5">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivitiesList />
      </section>
    </>
  )
}

export default App
