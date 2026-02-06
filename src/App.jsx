import usePokemonQuiz from './hooks/usePokemonQuiz'
import StartScreen from './components/StartScreen'
import QuizCard from './components/QuizCard'
import ScoreBoard from './components/ScoreBoard'
import ResultScreen from './components/ResultScreen'

function App() {
  const {
    gameState,
    currentQuestion,
    questionNumber,
    totalQuestions,
    score,
    selectedAnswer,
    loading,
    answered,
    startGame,
    submitAnswer,
    nextQuestion,
    restartGame,
  } = usePokemonQuiz()

  if (gameState === 'start') {
    return <StartScreen onStart={startGame} />
  }

  if (gameState === 'result') {
    return (
      <ResultScreen
        score={score}
        totalQuestions={totalQuestions}
        onRestart={restartGame}
      />
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <ScoreBoard
        questionNumber={questionNumber}
        totalQuestions={totalQuestions}
        score={score}
      />
      <QuizCard
        question={currentQuestion}
        onAnswer={submitAnswer}
        onNext={nextQuestion}
        selectedAnswer={selectedAnswer}
        answered={answered}
        loading={loading}
      />
    </div>
  )
}

export default App
