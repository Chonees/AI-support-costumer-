import { useState } from "react";
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
  // State for loading
  const [loading, setLoading] = useState(false);
  // State for error
  const [error, setError] = useState("");

  // Handler for the "Send" button
  const handleAsk = async () => {
    // Reset error
    setError("");
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
      setError("We could not get a response from the server. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);         // 5) Terminamos el ciclo de carga
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>AI Customer Support Agent</h2>

      <textarea
        style={styles.textarea}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Write a question about your client (e.g: 'What accounts do I have in the Energy sector?')"
        rows={5}
      />

      <button style={styles.button} onClick={handleAsk} disabled={loading}>
        {loading ? "Loading..." : "Send"}
      </button>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.responseBox}>
        <strong>Response:</strong>
        <pre style={styles.pre}>{response || "(here will be the answer)"}</pre>
      </div>
    </div>
  );
}


const styles = {
  wrapper: { maxWidth: 720, margin: "40px auto", padding: 16, fontFamily: "system-ui, sans-serif" },
  title: { marginBottom: 12 },
  textarea: { width: "100%", padding: 12, fontSize: 16, lineHeight: 1.4 },
  button: { marginTop: 8, padding: "10px 16px", fontSize: 16, cursor: "pointer" },
  error: { marginTop: 8, color: "#b00020" },
  responseBox: { marginTop: 16, background: "#fafafa", padding: 12, border: "1px solid #eee" },
  pre: { whiteSpace: "pre-wrap", wordBreak: "break-word" },
};
