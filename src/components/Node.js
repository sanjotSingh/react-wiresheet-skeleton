// src/components/Node.js
import React from 'react';
import { Handle } from 'react-flow-renderer';

const Node = ({ data }) => {
  return (
    <div>
      <div>{data.label}</div>
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
    </div>
  );
};

export default Node;
