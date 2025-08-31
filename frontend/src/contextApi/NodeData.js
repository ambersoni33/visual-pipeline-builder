import { createContext, useState } from "react";

export const NodeData = createContext();

export const NodeDataProvider = ({children})=>{
    const [nodeLabel,setNodeLabel] = useState("");
    const [nodeType,setNodeType] = useState("");
    const [handleCount,setHandleCount] = useState(0);
    const [targetHandles,setTargetHandles] = useState(0);
    const [sourceHandles,setSourceHandles] = useState(0);
    const [selectNode,setSelectNode] = useState(false);
    const [nodeId, setNodeId] = useState(0);

    const [nodeData,setNodeData] = useState([]);

    return(
        <NodeData.Provider value={{nodeLabel,nodeType,nodeData,handleCount,targetHandles,sourceHandles,nodeId,setNodeLabel, setNodeType,setNodeData,setHandleCount,setTargetHandles,setSourceHandles,setSelectNode,setNodeId}}>
            {children}
        </NodeData.Provider>
    )
}