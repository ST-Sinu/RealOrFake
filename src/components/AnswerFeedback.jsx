import "./AnswerFeedback.css";

function AnswerFeedback({
  wasCorrect,
  score,
  lives,
  onNext,
  currentRound, // 현재 라운드 번호
  sourceInfo, // imageSources 객체
}) {
  const roundSource = sourceInfo[currentRound]; // 해당 라운드 출처 가져오기

  return (
    <div className="feedback-modal">
      <div className="feedback-content">
        <h2>
          {wasCorrect
            ? "정답입니다! 🎉"
            : "AI가 생성한 이미지를 고르셨습니다 😢"}
        </h2>

        <p>이번 라운드 이미지 출처:</p>
        <ul>
          <li>
            실제 이미지:{" "}
            <a
              href={roundSource.real.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {roundSource.real.label}
            </a>
          </li>
          <li>
            AI 생성 이미지:{" "}
            <a
              href={roundSource.fake.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {roundSource.fake.label}
            </a>
          </li>
        </ul>

        <p>현재 점수: {score}</p>
        {/* <p>남은 목숨: {"🍎".repeat(wasCorrect ? lives : lives - 1)}</p> */}
        <p>남은 목숨: {"🍎".repeat(lives)}</p>
        <button onClick={onNext}>다음 문제</button>
      </div>
    </div>
  );
}

export default AnswerFeedback;
