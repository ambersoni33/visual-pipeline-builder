import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { NodeData } from "../contextApi/NodeData";

export const CustomNode = ({ id, data }) => {

  
  const { setNodes, getNodes, setEdges } = useReactFlow();
  const contentRef = useRef(null);
  const [bgColor, setBgColor] = useState(data?.bgColor || "#ffffff");
  const [label, setLabel] = useState(data.nodeLabel || `${id}` );
  const [url, setUrl] = useState(data?.url || "");
  const [editing, setEditing] = useState(false);
  const [dynamicHeight, setDynamicHeight] = useState(100);

  const variables = useMemo(() => {
    if (!label) return [];
    const matches = label.match(/{{(.*?)}}/g) || [];
    return matches.map((m) => m.replace(/[{}]/g, ""));
  }, [label]);

  useEffect(() => {
    if (contentRef.current) {
      setDynamicHeight(Math.max(100, contentRef.current.scrollHeight + 20));
    }
  }, [label, url, editing]);

  useEffect(() => {
    if (variables.length === 0) return;

    const allNodes = getNodes();

    variables.forEach((v) => {
      const targetNode = allNodes.find(
        (n) => n.id !== id && n.data?.label === v
      );

      if (targetNode) {
        setEdges((eds) => {
          const edgeId = `e-${targetNode.id}-${id}`;
          if (eds.some((e) => e.id === edgeId)) return eds;

          return [
            ...eds,
            {
              id: edgeId,
              source: targetNode.id,
              target: id,
              type: "smoothstep",
            },
          ];
        });
      }
    });
  }, [variables, getNodes, setEdges, id]);
  
  const deleteNode = () => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
  };

  return (
    <div
      onDoubleClick={() => setEditing(true)}
      style={{
        background: bgColor,
        minWidth: 220,
        height: dynamicHeight,
        border: "2px solid #1e293b",
        borderRadius: "12px",
        padding: "12px",
        textAlign: "center",
        position: "relative",
        wordBreak: "break-word",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "translateY(-4px)";
        e.target.style.boxShadow = "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        e.target.style.borderColor = "#3b82f6";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        e.target.style.borderColor = "#1e293b";
      }}
    >
      <div ref={contentRef}>
        {!editing ? (
          <>
            {/* Display Mode */}
            <div style={{ 
              fontWeight: "700", 
              marginBottom: "12px", 
              wordBreak: "break-word",
              fontSize: "16px",
              color: "#1e293b",
              textShadow: "0 1px 2px rgba(0,0,0,0.1)"
            }}>
              {label}
            </div>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{ 
                  color: "#2563eb", 
                  textDecoration: "underline", 
                  fontSize: "14px", 
                  wordBreak: "break-word",
                  display: "inline-block",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#dbeafe";
                  e.target.style.color = "#1d4ed8";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#2563eb";
                }}
              >
                 {url}
              </a>
            )}

            {/* Delete button */}
            <button
              onClick={deleteNode}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "6px",
                cursor: "pointer",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(239, 68, 68, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.1)";
                e.target.style.boxShadow = "0 4px 8px rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 2px 4px rgba(239, 68, 68, 0.3)";
              }}
            >
              ✕
            </button>
          </>
        ) : (
          <>
            {/* Edit Mode */}
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "16px",
              borderRadius: "8px",
              border: "2px solid #3b82f6",
              marginBottom: "12px"
            }}>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter node label"
                style={{ 
                  border: "2px solid #d1d5db", 
                  padding: "8px 12px", 
                  borderRadius: "6px", 
                  marginBottom: "12px", 
                  width: "100%",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL or Text"
                style={{ 
                  border: "2px solid #d1d5db", 
                  padding: "8px 12px", 
                  borderRadius: "6px", 
                  marginBottom: "12px", 
                  width: "100%",
                  fontSize: "14px",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#3b82f6";
                  e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#d1d5db";
                  e.target.style.boxShadow = "none";
                }}
              />
              
              <div style={{ 
                display: "flex", 
                gap: "8px", 
                justifyContent: "center", 
                marginBottom: "12px",
                flexWrap: "wrap"
              }}>
                {[
                  "rgb(250, 168, 168)",
                  "rgb(110, 175, 244)",
                  "rgb(135, 236, 158)",
                  "rgb(237, 236, 124)",
                  "rgb(237, 124, 201)",
                  "rgb(168, 85, 247)",
                  "rgb(251, 146, 60)",
                  "rgb(34, 197, 94)"
                ].map((color) => (
                  <button
                    key={color}
                    onClick={() => setBgColor(color)}
                    style={{
                      background: color,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      border: "2px solid #ffffff",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "scale(1.2)";
                      e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "scale(1)";
                      e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
                    }}
                  />
                ))}
              </div>
              
              <div style={{
                display: "flex",
                gap: "8px",
                justifyContent: "center"
              }}>
                <button
                  onClick={() => setEditing(false)}
                  style={{ 
                    backgroundColor: "#10b981", 
                    padding: "8px 16px", 
                    borderRadius: "6px",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#059669";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#10b981";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  style={{ 
                    backgroundColor: "#6b7280", 
                    padding: "8px 16px", 
                    borderRadius: "6px",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#4b5563";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#6b7280";
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Dynamic Target Handles (Left side, one per {{variable}}) */}
      {variables.map((variable, index) => (
        <Handle
          key={`t-${id}-${variable}-${index}`}
          type="target"
          position={Position.Left}
          id={`target-${id}-${variable}-${index}`}
          style={{
            top: `${(index + 1) * (100 / (variables.length + 1))}%`,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            border: "2px solid #ffffff",
            width: "12px",
            height: "12px",
            transition: "all 0.2s ease"
          }}
        />
      ))}

      {Array.from({ length: data.targetHandles || 1 }).map((_, index) => (
  <Handle
    key={`t-${id}-${index}`}
    type="target"
    position={Position.Left}
    id={`target-${id}-${index}`}
    style={{
      top: `${(index + 1) * (100 / ((data.targetHandles || 1) + 1))}%`,
      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
      border: "2px solid #ffffff",
      width: "12px",
      height: "12px",
    }}
  />
))}

{/* Source handles (right side) */}
{Array.from({ length: data.sourceHandles || 1 }).map((_, index) => (
  <Handle
    key={`s-${id}-${index}`}
    type="source"
    position={Position.Right}
    id={`source-${id}-${index}`}
    style={{
      top: `${(index + 1) * (100 / ((data.sourceHandles || 1) + 1))}%`,
      background: "linear-gradient(135deg, #16a34a, #15803d)",
      border: "2px solid #ffffff",
      width: "12px",
      height: "12px",
    }}
  />
))}
    </div>
  );
};
