import { useEffect, useState } from "react";
import "./Body.css";
import ResultScreen from "./ResultScreen";
import AnswerFeedback from "./AnswerFeedback";
import imageSources from "../data/imageSource";
import CoupangAd from "./CoupangAd";

function Body({ score, currentRound, setScore, setCurrentRound }) {
  const [imagePair, setImagePair] = useState([]);
  const [correctIndex, setCorrectIndex] = useState(null);
  const [lives, setLives] = useState(3);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isGameClear, setIsGameClear] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [wasCorrect, setWasCorrect] = useState(false);
  const [lastChoiceIndex, setLastChoiceIndex] = useState(null);

  useEffect(() => {
    if (!isGameFinished) {
      loadNewImages();
    }
  }, [currentRound, isGameFinished]);

  const loadNewImages = () => {
    const round = currentRound;
    const isLeftReal = Math.random() < 0.5;
    const realPath = `/${round}/real.jpg`;
    const fakePath = `/${round}/fake.jpg`;

    if (isLeftReal) {
      setImagePair([realPath, fakePath]);
      setCorrectIndex(0);
    } else {
      setImagePair([fakePath, realPath]);
      setCorrectIndex(1);
    }
  };

  const handleChoice = (index) => {
    const isCorrect = index === correctIndex;
    setWasCorrect(isCorrect);
    setLastChoiceIndex(index);

    if (isCorrect) {
      setScore((prev) => prev + 1);
    } else {
      setLives((prev) => prev - 1);
    }

    setShowFeedback(true); // 피드백 보여주기
  };

  const handleNext = () => {
    const isLastRound = currentRound === 10;
    // const nextLives = wasCorrect ? lives : lives - 1;
    const nextLives = lives;

    setShowFeedback(false);

    if (nextLives <= 0) {
      setIsGameClear(false);
      setIsGameFinished(true);
    } else if (isLastRound) {
      setIsGameClear(true);
      setIsGameFinished(true);
    } else {
      setCurrentRound((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setCurrentRound(1);
    setIsGameFinished(false);
    setIsGameClear(false);
  };

  return (
    <main className="game-container">
      {isGameFinished ? (
        <ResultScreen
          score={score}
          lives={lives}
          isClear={isGameClear}
          onRestart={resetGame}
        />
      ) : (
        <>
          <div className="score-board">
            <p>
              두 사진 중에서 AI가 만든 사진이 아닌 진짜 사진을 고르세요.
              <br />
              AI 이미지 감별 능력을 키워보세요!
              <br />
              (Choose the <strong>non-AI-generated</strong> of the two photos)
            </p>
            <p>Score: {score}</p>
            <p>Round: {currentRound}/10</p>
            <p>Life: {"🍎".repeat(lives)}</p>
          </div>

          <div className="image-container">
            <div className="image-box" onClick={() => handleChoice(0)}>
              <h3>이미지 1</h3>
              <img src={imagePair[0]} alt="이미지 1" className="game-img" />
            </div>
            <div className="image-box" onClick={() => handleChoice(1)}>
              <h3>이미지 2</h3>
              <img src={imagePair[1]} alt="이미지 2" className="game-img" />
            </div>
          </div>

          <div className="controls">
            <button className="reset1">
              <a href="/">처음으로</a>
            </button>
          </div>

          {showFeedback && (
            <AnswerFeedback
              wasCorrect={wasCorrect}
              lastChoiceIndex={lastChoiceIndex}
              imagePair={imagePair}
              correctIndex={correctIndex}
              score={score}
              lives={lives}
              onNext={handleNext}
              currentRound={currentRound}
              sourceInfo={imageSources}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Body;
