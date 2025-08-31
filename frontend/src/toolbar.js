// toolbar.js

import { useContext, useEffect, useLayoutEffect } from 'react';
import { DraggableNode } from './draggableNode';
import { NodeData } from './contextApi/NodeData';

export const PipelineToolbar = () => {

    const {nodeData} = useContext(NodeData);

    useEffect(()=>{
        console.log("nodeData updated");
        
    },[nodeData])

    return (
        <div style={{ 
            padding: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            margin: '20px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
            <div style={{ 
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    margin: 0,
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: '700',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                }}>
                     Node Palette
                </h2>
                <p style={{
                    margin: '8px 0 0 0',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    Drag and drop nodes to create your pipeline
                </p>
            </div>
            
            <div style={{ 
                marginTop: '20px', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '15px',
                justifyContent: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <span style={{
                        fontSize: '12px',
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Built-in Nodes
                    </span>
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <DraggableNode type='customInput' label='Input' />
                        <DraggableNode type='llm' label='LLM' />
                        <DraggableNode type='customOutput' label='Output' />
                        <DraggableNode type='text' label='Text' />
                    </div>
                </div>
                
                {nodeData.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '20px'
                    }}>
                        <span style={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Custom Nodes
                        </span>
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                            {nodeData.map((node, index) => (
                                <DraggableNode 
                                    key={index} 
                                    type="customNode" 
                                    label={node.nodeLabel}
                                    targetHandles = {node.targetHandles}
                                    sourceHandles = {node.sourceHandles}

                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
