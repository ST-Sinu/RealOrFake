import { useEffect, useState } from "react";

function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/st-sinu/RearOrFake")
      .then((res) => res.json())
      .then((data) => setCount(data.value));
  }, []);

  return (
    <p
      style={{
        textAlign: "center",
        marginTop: "1rem",
        fontSize: "0.9rem",
        color: "#666",
      }}
    >
      방문자 수: {count !== null ? count : "로딩 중..."}
    </p>
  );
}

export default VisitorCounter;
