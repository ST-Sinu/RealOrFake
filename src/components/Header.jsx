import "./Header.css";

function Header() {
  const handleComingSoon = (e) => {
    e.preventDefault(); // 링크 이동 막기
    alert("아직 준비중입니다!");
  };

  const handleNow = (e) => {
    e.preventDefault(); // 링크 이동 막기
    alert("현재가 1탄입니다!");
  };

  return (
    <header className="header">
      <a href="https://st-sinu.github.io/">
        <h1>REAL OR FAKE : 진짜를 찾아라</h1>
      </a>
      <div className="series">
        <a href="https://st-sinu.github.io/" onClick={handleNow}>
          1탄
        </a>
        <a href="/" onClick={handleComingSoon}>
          2탄
        </a>
        <a href="/" onClick={handleComingSoon}>
          3탄
        </a>
      </div>

      <div className="banner">
        <a
          href="https://jkwon240.github.io/jkwon_first_project/"
          className="mini-game-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          미니 야구 게임
        </a>
      </div>
    </header>
  );
}

export default Header;
