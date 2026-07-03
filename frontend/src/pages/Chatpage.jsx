import { useState } from "react";
import ChatInput from "../UI components/ChatInput";

function Chatpage({ selectedPdf }) {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    if (!selectedPdf) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Please upload a PDF first.",
          role: "bot",
        },
      ]);
      return;
    }

    const userMessage = {
      id: Date.now(),
      text,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5001/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          filename: selectedPdf.filename,
        }),
      });

      const data = await response.json();
      const botReply = data.answer || data.error || "No response";

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botReply,
          role: "bot",
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Backend error",
          role: "bot",
        },
      ]);
    }
  };

  return (
    <div
      className="chatpage"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        flex: 1,
        backgroundColor: "#f4f6f9",
      }}
    >
      {/* Messages Window Container */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "12px 18px",
                  borderRadius: "14px",
                  borderBottomRightRadius: isUser ? "2px" : "14px",
                  borderBottomLeftRadius: isUser ? "14px" : "2px",
                  backgroundColor: isUser ? "#007bff" : "#ffffff",
                  color: isUser ? "#ffffff" : "#2d3748",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.06)",
                  lineHeight: "1.6",
                  fontSize: "15px",
                  textAlign: "left",
                  /* CRITICAL: Preserves line breaks (\n) from Gemini naturally without packages */
                  whiteSpace: "pre-wrap", 
                }}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}

export default Chatpage;