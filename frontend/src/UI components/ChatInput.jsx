import { useState } from "react";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;

    onSend(text);
    setText("");
  };

  return (
    <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #ddd" }}>
      
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask something about your PDF..."
        style={{ flex: 1, padding: "10px" }}
      />

      <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
        Send
      </button>

    </div>
  );
}

export default ChatInput;