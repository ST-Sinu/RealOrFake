import React, { useState } from "react";
import "./ResultScreen.css";

function ShareInfoModal({ shareUrl, shareText, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>공유 정보</h3>
        <p>
          <strong>공유 URL:</strong>
          <br />
          <code>{shareUrl}</code>
        </p>
        <p>
          <strong>공유 텍스트:</strong>
          <br />
          <code>{shareText}</code>
        </p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

function ResultScreen({ score, lives, isClear, onRestart }) {
  const [showShareInfo, setShowShareInfo] = useState(false);
  const [currentShareUrl, setCurrentShareUrl] = useState("");
  const [currentShareText, setCurrentShareText] = useState("");

  const baseUrl = window.location.href;
  const shareText = `나는 ${score}점을 기록했어요! 당신도 AI를 이길 수 있나요? 👁️`;

  // 모바일 및 웹에서 공통으로 쓸 수 있는 공유 URL 생성
  const getShareUrl = (platform) => {
    switch (platform) {
      case "kakao":
        // 카카오톡 모바일 공유 URL
        return `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(
          baseUrl
        )}`;
      case "facebook":
        // 페이스북 모바일 공유 URL
        return `https://m.facebook.com/sharer.php?u=${encodeURIComponent(
          baseUrl
        )}`;
      case "twitter":
        // 트위터 모바일 공유 URL + 텍스트 포함
        return `https://mobile.twitter.com/compose/tweet?url=${encodeURIComponent(
          baseUrl
        )}&text=${encodeURIComponent(shareText)}`;
      case "instagram":
        // 인스타그램은 공식적인 URL 공유 없고, 앱 열기 권장
        // 인스타그램 앱이 설치되어 있으면 앱 열기, 없으면 인스타그램 웹으로 이동
        return "instagram://app"; // 앱 열기 시도 (모바일만)
      default:
        return baseUrl;
    }
  };

  const handleShareClick = (platform) => {
    const url = getShareUrl(platform);

    setCurrentShareUrl(url);
    setCurrentShareText(
      platform === "twitter"
        ? shareText
        : "(공유 텍스트는 앱에서 자동 입력됩니다)"
    );
    setShowShareInfo(true);

    // 모바일 앱 호출 (인스타그램) 시도
    if (platform === "instagram") {
      // 인스타그램 앱 호출 후 fallback으로 웹 인스타그램 열기
      setTimeout(() => {
        window.open("https://www.instagram.com/", "_blank");
      }, 1500);

      window.location.href = url;
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(baseUrl);
    alert("링크가 복사되었습니다!");
  };

  return (
    <div className="result-screen">
      {isClear ? (
        <>
          <h2>🎉 축하합니다! 당신은 AI 위협에서 생존하셨습니다!!</h2>
          <p>점수: {score}점</p>
          <p>남은 목숨: {"🍎".repeat(lives)}</p>
        </>
      ) : (
        <>
          <h2>💀 당신은 AI 위협에 노출되었습니다</h2>
          <p>점수: {score}점</p>
          <p>생존 실패 😢</p>
        </>
      )}

      <div className="share-buttons">
        <p>
          <strong>가족과 친구도 AI 위협에 노출되어 있는지 확인하기!</strong>
        </p>

        <button className="share-btn" onClick={() => handleShareClick("kakao")}>
          카카오톡
        </button>

        <button
          className="share-btn"
          onClick={() => handleShareClick("instagram")}
        >
          인스타그램
        </button>

        <button
          className="share-btn"
          onClick={() => handleShareClick("facebook")}
        >
          페이스북
        </button>

        <button
          className="share-btn"
          onClick={() => handleShareClick("twitter")}
        >
          X (트위터)
        </button>

        <button className="share-btn" onClick={handleCopyLink}>
          링크 복사
        </button>
      </div>

      <button className="restart-btn" onClick={onRestart}>
        🔁 다시 도전하기
      </button>

      {showShareInfo && (
        <ShareInfoModal
          shareUrl={currentShareUrl}
          shareText={currentShareText}
          onClose={() => setShowShareInfo(false)}
        />
      )}
    </div>
  );
}

export default ResultScreen;
