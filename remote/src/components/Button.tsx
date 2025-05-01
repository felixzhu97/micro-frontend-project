import React from "react";

const Button: React.FC = () => {
  return (
    <button
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      onClick={() => alert("来自子应用的按钮点击！")}
    >
      子应用按钮
    </button>
  );
};

export default Button;
