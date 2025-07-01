import React, { useState } from "react";

const ChatAssistant: React.FC = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string; id: string }>
  >([]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        role: "user",
        content: message,
      };

      setMessages((prev) => [...prev, newMessage]);

      // 模拟AI回复
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `这是一个模拟回复：${message}`,
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);

      setMessage("");
    }
  };

  return (
    <div
      style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h3>DeepSeek 聊天助手 (Remote)</h3>

      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #eee",
          padding: "10px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center" }}>开始对话吧...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: "10px",
                padding: "8px",
                backgroundColor: msg.role === "user" ? "#e3f2fd" : "#f3e5f5",
                borderRadius: "4px",
              }}
            >
              <strong>{msg.role === "user" ? "用户" : "AI助手"}:</strong>{" "}
              {msg.content}
            </div>
          ))
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="输入消息..."
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          发送
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
