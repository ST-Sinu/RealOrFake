import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import VisitorCounter from "./components/VisitorCounter";
import CoupangAd from "./components/CoupangAd";

function App() {
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);

  return (
    <div className="app-container">
      <Header />
      <Body
        score={score}
        currentRound={currentRound}
        setScore={setScore}
        setCurrentRound={setCurrentRound}
      />
      <VisitorCounter /> {/* 👈 첫 화면 상단 또는 하단에 표시 */}
      <CoupangAd />
    </div>
  );
}

export default App;
