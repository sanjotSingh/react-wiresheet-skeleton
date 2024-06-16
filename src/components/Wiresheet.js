// src/components/Wiresheet.js
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactFlow, { MiniMap, Controls, Background } from 'react-flow-renderer';
import { useDrop } from 'react-dnd';
import { addNode, addConnection, updateNodePosition } from '../redux/wiresheetSlice';
import Layer from './Layer';
import Sidebar from './Sidebar'; // Import the Sidebar component

const nodeTypes = {
  layer: Layer,
};

const edgeTypes = {
  customConnection: ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, arrowHeadType }) => {
    const edgePath = `M${sourceX},${sourceY}C${sourceX + (targetX - sourceX) / 2},${sourceY} ${sourceX + (targetX - sourceX) / 2},${targetY} ${targetX},${targetY}`;
    return <path id={id} style={style} className="react-flow__edge-path" d={edgePath} markerEnd={arrowHeadType ? `url(#${arrowHeadType})` : undefined} />;
  },
};

const Wiresheet = () => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.wiresheet.nodes);
  const connections = useSelector((state) => state.wiresheet.connections);
  const [draggedNode, setDraggedNode] = useState(null);
  const dragIndicatorRef = useRef(null);

  const onConnect = (params) => dispatch(addConnection(params));

  const [{ isOver }, drop] = useDrop({
    accept: 'LAYER',
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const newNode = {
        id: (nodes.length + 1).toString(),
        type: item.type,
        data: { label: `${item.type} ${nodes.length + 1}` },
        position: { x: clientOffset.x - 200, y: clientOffset.y },
      };
      dispatch(addNode(newNode));
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const onNodeDragStart = (event, node) => {
    setDraggedNode(node);
    if (dragIndicatorRef.current) {
      dragIndicatorRef.current.style.display = 'block';
      dragIndicatorRef.current.style.width = `${node.width}px`;
      dragIndicatorRef.current.style.height = `${node.height}px`;
      dragIndicatorRef.current.style.left = `${node.position.x}px`;
      dragIndicatorRef.current.style.top = `${node.position.y}px`;
    }
  };

  const onNodeDrag = (event, node) => {
    if (dragIndicatorRef.current) {
      const offsetX = event.clientX - node.position.x;
      const offsetY = event.clientY - node.position.y;
      dragIndicatorRef.current.style.left = `${node.position.x + offsetX}px`;
      dragIndicatorRef.current.style.top = `${node.position.y + offsetY}px`;
    }
  };

  const onNodeDragStop = (event, node) => {
    dispatch(updateNodePosition({ id: node.id, position: node.position }));
    setDraggedNode(null);
    if (dragIndicatorRef.current) {
      dragIndicatorRef.current.style.display = 'none';
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div ref={drop} style={{ flex: 1, position: 'relative' }}>
        {isOver && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 255, 0, 0.1)' }} />}
        <div
          ref={dragIndicatorRef}
          style={{
            position: 'absolute',
            zIndex: 10,
            pointerEvents: 'none',
            border: '2px dashed #ccc',
            display: 'none',
            opacity: 0.5,
            backgroundColor: '#fff',
          }}
        >
          {draggedNode && <Layer data={draggedNode.data} />}
        </div>
        <ReactFlow
          nodes={nodes}
          edges={connections}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeDragStart={onNodeDragStart}
          onNodeDrag={onNodeDrag}
          onNodeDragStop={onNodeDragStop}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Wiresheet;
