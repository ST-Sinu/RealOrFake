import React, { useEffect, useRef } from "react";

function CoupangAd() {
  const adRef = useRef(null);

  useEffect(() => {
    // 광고 스크립트 추가
    const script1 = document.createElement("script");
    script1.src = "https://ads-partners.coupang.com/g.js";
    script1.async = true;
    document.body.appendChild(script1);

    // 광고 삽입을 약간 지연시켜 렌더 순서 보장
    const timeoutId = setTimeout(() => {
      if (window.PartnersCoupang && adRef.current) {
        new window.PartnersCoupang.G({
          id: 874862,
          template: "carousel",
          trackingCode: "AF3411794",
          width: "680",
          height: "140",
          tsource: "",
          element: adRef.current, // DOM element 직접 전달
        });
      }
    }, 300); // 약간의 지연

    return () => {
      document.body.removeChild(script1);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      style={{ margin: "2rem auto", textAlign: "center", maxWidth: "700px" }}
    >
      <div
        style={{
          fontSize: "0.9rem",
          color: "#666",
          backgroundColor: "#f9f9f9",
          padding: "10px 15px",
          borderRadius: "8px",
          marginBottom: "10px",
          border: "1px solid #ddd",
        }}
      >
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </div>

      {/* 실제 광고가 삽입될 대상 */}
      <div ref={adRef} />
    </div>
  );
}

export default CoupangAd;
