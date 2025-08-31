// submit.js
import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    const payload = { nodes, edges };

    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",   // better than GET for payload
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Pipeline Analysis:", result);
      alert(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Error submitting pipeline:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        margin: "20px",
      }}
    >
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          padding: "16px 32px",
          fontSize: "18px",
          fontWeight: "700",
          color: "white",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          boxShadow:
            "0 10px 25px -3px rgba(102, 126, 234, 0.4), 0 4px 6px -2px rgba(102, 126, 234, 0.2)",
          transition: "all 0.3s ease",
          textTransform: "uppercase",
          letterSpacing: "1px",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-4px) scale(1.05)";
          e.target.style.boxShadow =
            "0 20px 40px -3px rgba(102, 126, 234, 0.5), 0 8px 12px -2px rgba(102, 126, 234, 0.3)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0) scale(1)";
          e.target.style.boxShadow =
            "0 10px 25px -3px rgba(102, 126, 234, 0.4), 0 4px 6px -2px rgba(102, 126, 234, 0.2)";
        }}
      >
        🚀 Execute Pipeline
      </button>
    </div>
  );
};
