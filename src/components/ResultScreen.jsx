export default function ResultScreen({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getMessage = () => {
    if (percentage === 100) return { emoji: '🏆', text: '포켓몬 마스터!' }
    if (percentage >= 80) return { emoji: '🌟', text: '대단해요!' }
    if (percentage >= 60) return { emoji: '👍', text: '잘했어요!' }
    if (percentage >= 40) return { emoji: '💪', text: '좀 더 노력해봐요!' }
    return { emoji: '📚', text: '포켓몬 도감을 더 살펴보세요!' }
  }

  const { emoji, text } = getMessage()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in-up">
      <div className="bg-pokemon-card rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">
        <div className="text-7xl mb-4 animate-bounce-in">{emoji}</div>
        <h2 className="text-3xl font-bold text-pokemon-yellow mb-2">{text}</h2>

        <div className="my-8">
          <div className="text-6xl font-bold text-white mb-2">
            {score}
            <span className="text-2xl text-gray-400">/ {totalQuestions}</span>
          </div>
          <p className="text-xl text-gray-300">정답률 {percentage}%</p>
        </div>

        {/* Score bar */}
        <div className="w-full bg-gray-700 rounded-full h-4 mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${percentage}%`,
              background:
                percentage >= 80
                  ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                  : percentage >= 50
                    ? 'linear-gradient(90deg, #eab308, #facc15)'
                    : 'linear-gradient(90deg, #ef4444, #f87171)',
            }}
          />
        </div>

        <button
          onClick={onRestart}
          className="w-full py-4 bg-pokemon-red text-white text-xl font-bold rounded-xl
                     hover:bg-red-600 transition-all duration-200 hover:scale-105
                     active:scale-95 cursor-pointer shadow-lg"
        >
          다시 도전하기!
        </button>
      </div>
    </div>
  )
}
