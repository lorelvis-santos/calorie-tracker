type CalorieDisplayProps = {
    calories: number,
    text: string
}

export default function CalorieDisplay({calories, text} : CalorieDisplayProps) {
  return (
    <p className="font-bold rounded-full text-white grid grid-cols-1 gap-3 text-center">
        <span className="text-6xl font-black">{calories}</span>
        {text}
    </p>
  )
}