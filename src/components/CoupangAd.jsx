import React, { useEffect } from "react";

function CoupangAd() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://ads-partners.coupang.com/g.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      new PartnersCoupang.G({
        id: 874862,
        template: "carousel",
        trackingCode: "AF3411794",
        width: "680",
        height: "140",
        tsource: "",
        element: "coupang-ad"
      });
    `;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
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

      <div id="coupang-ad" />
    </div>
  );
}

export default CoupangAd;
