import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("195abc7cf6ba2d1d92953e9a03afea39"); // 여기에 실제 JS 키 넣기
    }
  }, []);

  const handleShareClick = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("카카오톡 공유를 사용할 수 없습니다.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "AI 위협 게임 결과",
        description: shareText,
        imageUrl:
          "https://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        link: {
          mobileWebUrl: baseUrl,
          webUrl: baseUrl,
        },
      },
      buttons: [
        {
          title: "웹에서 보기",
          link: {
            mobileWebUrl: baseUrl,
            webUrl: baseUrl,
          },
        },
      ],
    });

    setCurrentShareUrl(baseUrl);
    setCurrentShareText(shareText);
    setShowShareInfo(true);
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

        <button className="share-btn" onClick={handleShareClick}>
          카카오톡 공유하기
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
