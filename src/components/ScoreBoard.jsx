export default function ScoreBoard({ questionNumber, totalQuestions, score }) {
  const progress = (questionNumber / totalQuestions) * 100

  return (
    <div className="w-full max-w-lg mx-auto mb-6">
      <div className="flex justify-between items-center mb-2 text-gray-300">
        <span className="text-lg font-semibold">
          문제 {questionNumber} / {totalQuestions}
        </span>
        <span className="text-lg font-semibold text-pokemon-yellow">
          점수: {score}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="bg-pokemon-yellow h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
