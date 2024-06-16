// src/components/Connection.js
import React from 'react';
import { getBezierPath } from 'react-flow-renderer';
import './Connection.css';

const Connection = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  arrowHeadType,
}) => {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <path
      id={id}
      style={style}
      className="react-flow__edge-path"
      d={edgePath}
      markerEnd={arrowHeadType ? `url(#${arrowHeadType})` : undefined}
    />
  );
};

export default Connection;
