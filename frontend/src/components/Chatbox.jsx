import { useState } from "react";

function Chatbox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // ✅ Add user message
    const userMsg = { sender: "user", text: message };
    setChat((prev) => [...prev, userMsg]);

    setMessage("");
    setLoading(true);

    try {
      // 📦 Get pet profile from localStorage
      const petData = JSON.parse(localStorage.getItem("petProfile")) || {};

      // 🌐 API call
      // const res = await fetch("http://127.0.0.1:8000/api/chat", {
       const res = await fetch("https://pet-health-checker45.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          pet_type: petData.type || "dog",
          heart_rate: petData.heart_rate || "",
          temperature: petData.temperature || "",
          breathing_rate: petData.breathing_rate || "",
          activity_level: petData.activity || ""
        })
      });

      // ❗ Handle backend errors
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const data = await res.json();

      // ✅ Correct response key
      let text = data.result || "No response from AI";

      let i = 0;
      let temp = "";

      // ⌨️ Typing animation
      const interval = setInterval(() => {
        temp += text[i];

        setChat((prev) => {
          const newChat = [...prev];

          if (newChat[newChat.length - 1]?.sender === "ai") {
            newChat[newChat.length - 1].text = temp;
          } else {
            newChat.push({ sender: "ai", text: temp });
          }

          return newChat;
        });

        i++;

        if (i >= text.length) {
          clearInterval(interval);
          setLoading(false);
        }
      }, 15);

    } catch (err) {
      console.error("Chat Error:", err);

      setChat((prev) => [
        ...prev,
        { sender: "ai", text: "❌ Error connecting to backend" }
      ]);

      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h2 className="text-lg font-semibold mb-4">
        💬 Chat with AI
      </h2>

      {/* CHAT WINDOW */}
      <div className="h-64 overflow-y-auto border p-3 mb-4 rounded-lg bg-gray-50">

        {chat.map((msg, i) => (
          <div key={i} className="mb-2">
            <b>{msg.sender === "user" ? "You" : "AI"}:</b> {msg.text}
          </div>
        ))}

        {loading && (
          <p className="text-gray-400 text-sm">
            AI is typing...
          </p>
        )}

      </div>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about your pet health..."
          className="flex-1 p-2 border rounded-lg"
        />

        <button
          onClick={sendMessage}
          className="bg-teal-600 text-white px-4 rounded-lg hover:bg-teal-700"
        >
          Send
        </button>
      </div>

    </div>
  );
}

export default Chatbox;
