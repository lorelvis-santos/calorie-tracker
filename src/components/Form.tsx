import { useState } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories"

export default function Form() {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value
    })
  }

  const isValidActivity = () => {
    const { name, calories} = activity;
    return name.trim() !== "" && calories > 0;
  }

  return (
    <form className="space-y-5 bg-white shadow-xl p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="category">Categoría</label>
        <select 
          name="category"
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(category => {
            return (
              <option 
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="name">Actividad</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-1">
        <label htmlFor="calories">Calorías</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej: 300"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer transition-colors mt-5 rounded-lg disabled:opacity-10"
        value="Guardar"
        disabled={!isValidActivity()}
      />
    </form>
  )
}