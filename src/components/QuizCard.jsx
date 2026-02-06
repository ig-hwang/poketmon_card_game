import { useState } from 'react'

export default function QuizCard({
  question,
  onAnswer,
  onNext,
  selectedAnswer,
  answered,
  loading,
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  if (loading || !question) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
        <div className="w-16 h-16 border-4 border-pokemon-yellow border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-300 text-lg">포켓몬을 불러오는 중...</p>
      </div>
    )
  }

  const getButtonStyle = (choice) => {
    if (!answered) {
      return 'bg-pokemon-card hover:bg-indigo-900 border-2 border-gray-600 hover:border-pokemon-yellow text-white'
    }
    if (choice.isCorrect) {
      return 'bg-green-600 border-2 border-green-400 text-white'
    }
    if (selectedAnswer === choice && !choice.isCorrect) {
      return 'bg-red-600 border-2 border-red-400 text-white'
    }
    return 'bg-gray-700 border-2 border-gray-600 text-gray-400 opacity-50'
  }

  const getAnimation = (choice) => {
    if (!answered) return ''
    if (choice.isCorrect) return 'animate-bounce-in'
    if (selectedAnswer === choice && !choice.isCorrect) return 'animate-shake'
    return ''
  }

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto animate-fade-in-up">
      {/* Pokemon Image Card */}
      <div className="bg-pokemon-card rounded-2xl p-6 shadow-2xl mb-8 w-full animate-pulse-glow">
        <div className="bg-gray-800 rounded-xl p-4 flex items-center justify-center min-h-[250px] relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-pokemon-yellow border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <img
            src={question.imageUrl}
            alt="포켓몬"
            className={`w-56 h-56 object-contain transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${answered ? '' : 'drop-shadow-[0_0_15px_rgba(255,203,5,0.5)]'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {answered && (
          <p className="text-center text-2xl font-bold text-pokemon-yellow mt-4 animate-bounce-in">
            {question.correctName}!
          </p>
        )}
      </div>

      {/* Answer Choices */}
      <div className="grid grid-cols-2 gap-3 w-full mb-6">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onAnswer(choice)}
            disabled={answered}
            className={`py-4 px-3 rounded-xl font-bold text-lg transition-all duration-200
                       ${answered ? '' : 'hover:scale-105 active:scale-95 cursor-pointer'}
                       ${getButtonStyle(choice)} ${getAnimation(choice)}`}
          >
            {choice.name}
          </button>
        ))}
      </div>

      {/* Next Button */}
      {answered && (
        <button
          onClick={onNext}
          className="w-full py-4 bg-pokemon-blue text-white text-xl font-bold rounded-xl
                     hover:bg-blue-600 transition-all duration-200 hover:scale-105
                     active:scale-95 cursor-pointer shadow-lg animate-fade-in-up"
        >
          다음 문제 →
        </button>
      )}
    </div>
  )
}
