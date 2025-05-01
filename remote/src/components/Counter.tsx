import React, { useState } from "react";
import { CounterState } from "../types";

const Counter: React.FC = () => {
  const [state, setState] = useState<CounterState>({ count: 0 });

  const increment = () => setState({ count: state.count + 1 });
  const decrement = () => setState({ count: state.count - 1 });

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>计数器</h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={decrement}
          style={{
            padding: "5px 15px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          -
        </button>
        <span style={{ margin: "0 10px", fontSize: "20px" }}>
          {state.count}
        </span>
        <button
          onClick={increment}
          style={{
            padding: "5px 15px",
            backgroundColor: "#17a2b8",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
