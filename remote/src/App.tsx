import React from "react";
import Button from "./components/Button";
import TodoList from "./components/TodoList";
import Counter from "./components/Counter";

const App: React.FC = () => {
  return (
    <div>
      <h1>子应用</h1>
      <div style={{ padding: "20px" }}>
        <Button />
        <TodoList />
        <Counter />
      </div>
    </div>
  );
};

export default App;
