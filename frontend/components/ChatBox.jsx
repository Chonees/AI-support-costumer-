import { useState, useEffect } from "react";
import { askAgent } from "../src/api";

/**
 * ChatBox: component that allows
 * 1) write a question
 * 2) send it to the backend
 * 3) show the response
 */
export default function ChatBox() {
  // State for the user's question
  const [question, setQuestion] = useState("");
  // State for the backend's response
  const [response, setResponse] = useState("");
  // State for the displayed text (typewriter effect)
  const [displayedText, setDisplayedText] = useState("");
  // State for loading
  const [loading, setLoading] = useState(false);
  // State for error
  const [error, setError] = useState("");
  // State for typing effect
  const [isTyping, setIsTyping] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (response && response !== displayedText) {
      setIsTyping(true);
      setDisplayedText("");
      let index = 0;
      
      const typeInterval = setInterval(() => {
        if (index < response.length) {
          setDisplayedText(response.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typeInterval);
        }
      }, 30); // Velocidad de escritura: 30ms por carácter

      return () => clearInterval(typeInterval);
    }
  }, [response]);

  // Handler for the "Send" button
  const handleAsk = async () => {
    // Reset error and displayed text
    setError("");
    setDisplayedText("");
    setResponse("");
    // Avoid sending empty strings
    if (!question.trim()) {
      setError("Please write a question.");
      return;
    }

    try {
      setLoading(true);          // 1) Indicamos que empezó la petición
      const answer = await askAgent(question);  // 2) Llamada a la API
      setResponse(answer);       // 3) Guardamos la respuesta para mostrarla
    } catch (err) {
      // 4) Si falla, guardamos un mensaje de error legible
      setError("Could not get response from server. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);         // 5) Terminamos el ciclo de carga
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>AI Customer Support Agent</h2>

      <div style={styles.inputSection}>
        <textarea
          style={styles.textarea}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write your question about the client (e.g., 'What accounts do I have in the energy sector?')"
          rows={5}
        />

        <button style={styles.button} onClick={handleAsk} disabled={loading}>
          {loading ? "🚀 Processing..." : "💬 Send"}
        </button>

        {error && <div style={styles.error}>{error}</div>}
      </div>

      <div 
        className="response-box-scroll"
        style={{
          ...styles.responseBox,
          animation: response ? 'responseGrow 0.6s ease-out' : 'none',
          boxShadow: response ? 
            "inset 0 2px 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(136, 136, 136, 0.15)" : 
            "inset 0 2px 10px rgba(0, 0, 0, 0.2)"
        }}>
        <div style={styles.responseTitle}>🤖 AI Response</div>
        <pre style={{
          ...styles.pre,
          opacity: displayedText ? 1 : 0.5,
          transform: displayedText ? 'translateY(0)' : 'translateY(5px)',
          transition: 'all 0.4s ease-out'
        }}>
          {displayedText || "(The AI assistant's response will appear here...)"}
          {isTyping && <span style={styles.cursor}>|</span>}
        </pre>
      </div>
    </div>
  );
}


const styles = {
  wrapper: { 
    maxWidth: 1200, 
    width: "95%",
    margin: "0 auto", 
    padding: "1rem 4rem 3rem 4rem", 
    fontFamily: "'Inter', system-ui, sans-serif",
    background: "linear-gradient(135deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.8) 100%)",
    borderRadius: "16px",
    border: "1px solid rgba(102, 102, 102, 0.3)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(136, 136, 136, 0.1)",
    position: "relative",
    minHeight: "400px",
    maxHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "2rem",
    overflow: "auto"
  },
  title: { 
    marginBottom: "0", 
    fontSize: "1.8rem",
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    background: "linear-gradient(135deg, #888888, #666666)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 20px rgba(136, 136, 136, 0.3)",
    width: "100%"
  },
  inputSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem"
  },
  textarea: { 
    width: "100%", 
    padding: "1.5rem 2rem", 
    fontSize: "1rem", 
    lineHeight: 1.5,
    background: "rgba(10, 10, 10, 0.8)",
    border: "2px solid rgba(102, 102, 102, 0.3)",
    borderRadius: "12px",
    color: "#ffffff",
    fontFamily: "inherit",
    resize: "none",
    minHeight: "100px",
    transition: "all 0.3s ease",
    boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.3)",
    outline: "none"
  },
  button: { 
    padding: "1rem 3rem", 
    fontSize: "1rem", 
    fontWeight: "600",
    cursor: "pointer",
    background: "linear-gradient(135deg, #888888, #666666)",
    border: "none",
    borderRadius: "12px",
    color: "#ffffff",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(136, 136, 136, 0.3)",
    position: "relative",
    overflow: "hidden",
    minWidth: "200px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    alignSelf: "center"
  },
  error: { 
    color: "#ff4757",
    padding: "1rem",
    background: "rgba(255, 71, 87, 0.1)",
    border: "1px solid rgba(255, 71, 87, 0.3)",
    borderRadius: "8px",
    fontSize: "0.9rem",
    width: "100%",
    textAlign: "center"
  },
  responseBox: { 
    background: "rgba(10, 10, 10, 0.6)", 
    padding: "1.5rem 2rem", 
    border: "1px solid rgba(102, 102, 102, 0.2)",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
    boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.2)",
    minHeight: "60px",
    maxHeight: "300px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease",
    transformOrigin: "top center"
  },
  responseTitle: {
    color: "#888888",
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "1rem",
    textShadow: "0 0 10px rgba(136, 136, 136, 0.5)"
  },
  pre: { 
    whiteSpace: "pre-wrap", 
    wordBreak: "break-word",
    color: "#b8b8b8",
    fontSize: "1rem",
    lineHeight: 1.6,
    margin: 0,
    flex: 1,
    
    transition: "opacity 0.3s ease-in-out",
    animation: "textAppear 0.5s ease-out"
  },
  cursor: {
    color: "#888888",
    fontSize: "1rem",
    animation: "blink 1s infinite",
    marginLeft: "2px"
  },
};
