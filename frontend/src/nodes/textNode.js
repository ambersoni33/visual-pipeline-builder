// TextNode.js
import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [nodeSize, setNodeSize] = useState({ width: 200, height: 80 });
  const [hasVariable, setHasVariable] = useState(false);

  // Update size when text changes
  useEffect(() => {
    const lines = currText.split('\n').length;
    const extraHeight = Math.min(200, 20 * lines); 
    const extraWidth = Math.min(400, 10 * currText.length); 
    setNodeSize({
      width: Math.max(200, extraWidth),
      height: Math.max(80, extraHeight),
    });

    const regex = /\{\{(.*?)\}\}/g;
    setHasVariable(regex.test(currText));
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div
      style={{
        width: nodeSize.width,
        height: nodeSize.height,
        border: '1px solid black',
        padding: '5px',
        borderRadius: '8px',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Text Node</div>
      <div>
        <label style={{ fontSize: '12px' }}>
          Text:
          <input
            type="text"
            value={currText}
            onChange={handleTextChange}
            style={{
              width: '100%',
              marginTop: '4px',
              padding: '2px',
              fontSize: '12px',
            }}
          />
        </label>
      </div>

      {/* Right side always has source handle */}
      <Handle type="source" position={Position.Right} id={`${id}-output`} />

      {/* Left side shows only if {{variable}} exists */}
      {hasVariable && (
        <Handle type="target" position={Position.Left} id={`${id}-input`} />
      )}
    </div>
  );
};
