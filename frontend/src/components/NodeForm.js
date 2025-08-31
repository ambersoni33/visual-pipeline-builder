import { useContext, useEffect, useMemo, useState } from "react";
import { NodeData } from "../contextApi/NodeData";

export const NodeForm = ()=>{
    const [isFormVisible, setIsFormVisible] = useState(false);

    const {nodeType,
        nodeLabel,
        setNodeType,
         setNodeLabel,
         setNodeData,
         handleCount,
    setHandleCount,
    targetHandles,
    setTargetHandles,
    sourceHandles,
    setSourceHandles,nodeData,nodeId, setNodeId} = useContext(NodeData);

    const onDragStart = (event, nodeInfo) => {
    const appData = {
      nodeType: 'customNode',
      data: {
        nodeLabel: nodeInfo.nodeLabel,
        targetHandles: nodeInfo.targetHandles,
        sourceHandles: nodeInfo.sourceHandles,
      }
    };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

     const targetOptions = useMemo(
    () => Array.from({ length: handleCount }, (_, i) => i + 1),
    [handleCount]
  );
  const maxSource = Math.max(handleCount - (targetHandles || 0), 0);

  const sourceOptions = useMemo(
    () => Array.from({ length: maxSource }, (_, i) => i + 1),
    [maxSource]
  );
  useEffect(() => {
    if (targetHandles > handleCount) {
      setTargetHandles(0);
    }
  }, [handleCount, targetHandles, setTargetHandles]);

  useEffect(() => {
    if (sourceHandles > maxSource) {
      setSourceHandles(0);
    }
  }, [maxSource, sourceHandles, setSourceHandles]);



    const handlesubmit = (e)=>{
        e.preventDefault();
        console.log({nodeType,nodeLabel,handleCount,targetHandles,sourceHandles});
        
        setNodeData((prev)=>[{nodeType,nodeLabel,targetHandles,sourceHandles,nodeId},...prev]);
        
        
        // Reset form and hide it
        setNodeLabel("");
        setNodeType("");
        setHandleCount(0);
        setTargetHandles(0);
        setSourceHandles(0);
        setIsFormVisible(false);
        setNodeId((prev)=>prev+1);
    }

    useEffect(()=>{
         console.log(nodeData);
},[nodeData])

    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    }

    return(
      <>
        <div style={{
            marginTop: "20px",
            marginLeft: "20px",
            marginRight: "20px",
            padding: "20px",
            backgroundColor: "#f8fafc",
            borderRadius: "12px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0"
        }}>
           
            {!isFormVisible ? (
                <button 
                    onClick={toggleForm}
                    style={{
                        padding: "12px 24px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#2563eb";
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 4px 8px rgba(59, 130, 246, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#3b82f6";
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "0 2px 4px rgba(59, 130, 246, 0.3)";
                    }}
                >
                    ✨ Create New Node
                </button>
            ) : (
                <div style={{
                    animation: "slideDown 0.3s ease-out"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        paddingBottom: "15px",
                        borderBottom: "2px solid #e2e8f0"
                    }}>
                        <h2 style={{
                            margin: 0,
                            color: "#1e293b",
                            fontSize: "24px",
                            fontWeight: "700"
                        }}>
                            🚀 Create New Node
                        </h2>
                        <button 
                            onClick={toggleForm}
                            style={{
                                background: "none",
                                border: "none",
                                fontSize: "24px",
                                cursor: "pointer",
                                color: "#64748b",
                                padding: "8px",
                                borderRadius: "50%",
                                transition: "all 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#f1f5f9";
                                e.target.style.color = "#ef4444";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#64748b";
                            }}
                        >
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handlesubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "20px"
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            }}>
                                <label htmlFor="Label" style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#374151"
                                }}>
                                    Node Label:
                                </label>
                                <input 
                                    name="nodelabel" 
                                    id="Label" 
                                    value={nodeLabel} 
                                    onChange={(e)=> setNodeLabel(e.target.value)}
                                    style={{
                                        padding: "12px 16px",
                                        border: "2px solid #d1d5db",
                                        borderRadius: "8px",
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
                                    placeholder="Enter node label"
                                />
                            </div>

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px"
                            }}>
                                <label htmlFor="nodeType" style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "#374151"
                                }}>
                                    Node Type:
                                </label>
                                <input 
                                    name="nodeType" 
                                    id="nodeType" 
                                    value={nodeType} 
                                    onChange={(e)=> setNodeType(e.target.value)}
                                    style={{
                                        padding: "12px 16px",
                                        border: "2px solid #d1d5db",
                                        borderRadius: "8px",
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
                                    placeholder="Enter node type"
                                />
                            </div>
                        </div>

                        {/* Handle Count */}
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        }}>
                            <label style={{ 
                                fontSize: "16px", 
                                fontWeight: "600", 
                                color: "#1e293b",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px"
                            }}>
                                🔗 Number of Handles
                            </label>
                            <select
                                value={handleCount}
                                onChange={(e) => {
                                    const n = Number(e.target.value);
                                    setHandleCount(n);
                                    setTargetHandles(0);
                                    setSourceHandles(0);
                                }}
                                style={{ 
                                    width: "100%", 
                                    padding: "12px 16px", 
                                    border: "2px solid #d1d5db", 
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    backgroundColor: "white",
                                    cursor: "pointer",
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
                            >
                                <option value={0}>Select number of handles...</option>
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>{n} handle{n !== 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        {handleCount > 0 && (
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "20px"
                            }}>
                                {/* Target Handles */}
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px"
                                }}>
                                    <label style={{ 
                                        fontSize: "16px", 
                                        fontWeight: "600", 
                                        color: "#1e293b",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    }}>
                                        📥 Target Handles
                                    </label>
                                    <select
                                        value={targetHandles}
                                        onChange={(e) => {
                                            setTargetHandles(Number(e.target.value));
                                            setSourceHandles(0);
                                        }}
                                        style={{ 
                                            width: "100%", 
                                            padding: "12px 16px", 
                                            border: "2px solid #d1d5db", 
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            backgroundColor: "white",
                                            cursor: "pointer",
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
                                    >
                                        <option value={0}>Select target handles...</option>
                                        {targetOptions.map((opt) => (
                                            <option key={opt} value={opt}>{opt} target{opt !== 1 ? 's' : ''}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Source Handles */}
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px"
                                }}>
                                    <label style={{ 
                                        fontSize: "16px", 
                                        fontWeight: "600", 
                                        color: "#1e293b",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    }}>
                                        📤 Source Handles
                                    </label>
                                    <select
                                        value={sourceHandles}
                                        onChange={(e) => setSourceHandles(Number(e.target.value))}
                                        style={{ 
                                            width: "100%", 
                                            padding: "12px 16px", 
                                            border: "2px solid #d1d5db", 
                                            borderRadius: "8px",
                                            fontSize: "14px",
                                            backgroundColor: "white",
                                            cursor: "pointer",
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
                                        disabled={maxSource === 0}
                                    >
                                        {maxSource === 0 ? (
                                            <option value={0}>0 (none available)</option>
                                        ) : (
                                            <>
                                                <option value={0}>Select source handles...</option>
                                                {sourceOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt} source{opt !== 1 ? 's' : ''}</option>
                                                ))}
                                            </>
                                        )}
                                    </select>
                                </div>
                            </div>
                        )}

                        <div style={{
                            display: "flex",
                            gap: "12px",
                            justifyContent: "flex-end",
                            marginTop: "10px"
                        }}>
                            <button 
                                type="button"
                                onClick={toggleForm}
                                style={{
                                    padding: "12px 24px",
                                    backgroundColor: "#6b7280",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    cursor: "pointer",
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
                            <button 
                                type="submit" 
                                style={{ 
                                    padding: "12px 32px", 
                                    backgroundColor: "#10b981", 
                                    color: "white", 
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: "0 2px 4px rgba(16, 185, 129, 0.3)"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#059669";
                                    e.target.style.transform = "translateY(-2px)";
                                    e.target.style.boxShadow = "0 4px 8px rgba(16, 185, 129, 0.4)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#10b981";
                                    e.target.style.transform = "translateY(0)";
                                    e.target.style.boxShadow = "0 2px 4px rgba(16, 185, 129, 0.3)";
                                }}
                                disabled={!nodeType || !nodeLabel}
                            >
                                🎯 Create Node
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>

        <style jsx>{`
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}</style>
        </>
    );
}