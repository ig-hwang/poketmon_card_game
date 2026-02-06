import { useState, useCallback } from 'react'

const TOTAL_QUESTIONS = 10
const GEN1_MAX = 151
const CHOICES_COUNT = 4

function getRandomIds(count, exclude = null) {
  const ids = new Set()
  if (exclude !== null) ids.add(exclude)
  while (ids.size < count + (exclude !== null ? 1 : 0)) {
    ids.add(Math.floor(Math.random() * GEN1_MAX) + 1)
  }
  ids.delete(exclude)
  return [...ids].slice(0, count)
}

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

async function fetchPokemonName(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
  const data = await res.json()
  const koreanName = data.names.find((n) => n.language.name === 'ko')
  return koreanName ? koreanName.name : data.name
}

async function fetchQuizQuestion() {
  const correctId = Math.floor(Math.random() * GEN1_MAX) + 1
  const wrongIds = getRandomIds(CHOICES_COUNT - 1, correctId)

  const [correctName, ...wrongNames] = await Promise.all([
    fetchPokemonName(correctId),
    ...wrongIds.map((id) => fetchPokemonName(id)),
  ])

  const choices = shuffle([
    { name: correctName, isCorrect: true },
    ...wrongNames.map((name) => ({ name, isCorrect: false })),
  ])

  return {
    pokemonId: correctId,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${correctId}.png`,
    correctName,
    choices,
  }
}

export default function usePokemonQuiz() {
  const [gameState, setGameState] = useState('start') // start | playing | result
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [loading, setLoading] = useState(false)
  const [answered, setAnswered] = useState(false)

  const loadQuestion = useCallback(async () => {
    setLoading(true)
    setSelectedAnswer(null)
    setAnswered(false)
    try {
      const question = await fetchQuizQuestion()
      setCurrentQuestion(question)
    } catch (err) {
      console.error('Failed to fetch pokemon:', err)
    }
    setLoading(false)
  }, [])

  const startGame = useCallback(async () => {
    setScore(0)
    setQuestionNumber(1)
    setGameState('playing')
    await loadQuestion()
  }, [loadQuestion])

  const submitAnswer = useCallback(
    (choice) => {
      if (answered) return
      setSelectedAnswer(choice)
      setAnswered(true)
      if (choice.isCorrect) {
        setScore((s) => s + 1)
      }
    },
    [answered],
  )

  const nextQuestion = useCallback(async () => {
    if (questionNumber >= TOTAL_QUESTIONS) {
      setGameState('result')
    } else {
      setQuestionNumber((n) => n + 1)
      await loadQuestion()
    }
  }, [questionNumber, loadQuestion])

  const restartGame = useCallback(async () => {
    await startGame()
  }, [startGame])

  return {
    gameState,
    currentQuestion,
    questionNumber,
    totalQuestions: TOTAL_QUESTIONS,
    score,
    selectedAnswer,
    loading,
    answered,
    startGame,
    submitAnswer,
    nextQuestion,
    restartGame,
  }
}
