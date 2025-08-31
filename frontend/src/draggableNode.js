// draggableNode.js

export const DraggableNode = ({ type, label,targetHandles,sourceHandles }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType,
      data: {
        nodeLabel: label,
        targetHandles: targetHandles,
        sourceHandles: sourceHandles,
      }

       }
      event.target.style.cursor = 'grabbing';
      event.target.style.transform = 'scale(0.95) rotate(2deg)';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };

    const onDragEnd = (event) => {
      event.target.style.cursor = 'grab';
      event.target.style.transform = 'scale(1) rotate(0deg)';
    };

    const getNodeColor = (nodeType) => {
      const colors = {
        'customInput': 'linear-gradient(135deg, #10b981, #059669)',
        'llm': 'linear-gradient(135deg, #3b82f6, #2563eb)',
        'customOutput': 'linear-gradient(135deg, #f59e0b, #d97706)',
        'text': 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
        'customNode': 'linear-gradient(135deg, #ec4899, #db2777)'
      };
      return colors[nodeType] || 'linear-gradient(135deg, #6b7280, #4b5563)';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={onDragEnd}
        style={{ 
          cursor: 'grab', 
          minWidth: '100px', 
          height: '70px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '12px',
          background: getNodeColor(type),
          justifyContent: 'center', 
          flexDirection: 'column',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-4px) scale(1.05)';
          e.target.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        }}
        draggable
      >
        {/* Shine effect overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          transition: 'left 0.5s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.left = '100%';
        }}
        />
        
        <div style={{
          fontSize: '20px',
          marginBottom: '4px',
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
        }}>
        </div>
        <span style={{ 
          color: '#fff', 
          fontSize: '12px',
          fontWeight: '600',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          lineHeight: '1.2'
        }}>
          {label}
        </span>
      </div>
    );
  };
  