export default function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in-up">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-pokemon-yellow mb-4 drop-shadow-lg">
          포켓몬 퀴즈!
        </h1>
        <p className="text-xl text-gray-300 mb-2">
          포켓몬 이미지를 보고 이름을 맞춰보세요
        </p>
        <p className="text-gray-400">1세대 포켓몬 151마리 중 출제됩니다</p>
      </div>

      <div className="bg-pokemon-card rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">
        <div className="text-6xl mb-6">🎴</div>
        <div className="space-y-3 text-gray-300 text-left mb-8">
          <p>✅ 총 10문제가 출제됩니다</p>
          <p>✅ 4개의 보기 중 정답을 고르세요</p>
          <p>✅ 포켓몬의 한글 이름이 표시됩니다</p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 bg-pokemon-red text-white text-xl font-bold rounded-xl
                     hover:bg-red-600 transition-all duration-200 hover:scale-105
                     active:scale-95 cursor-pointer shadow-lg"
        >
          게임 시작!
        </button>
      </div>
    </div>
  )
}
