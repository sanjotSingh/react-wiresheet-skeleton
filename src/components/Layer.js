// src/components/Layer.js
import React from 'react';
import { Handle } from 'react-flow-renderer';
import LayerContextMenu from './LayerContextMenu';

const Layer = ({ data, id, onEdit, onDelete, onUnlink }) => {
  const handleRightClick = (event) => {
    event.preventDefault();
    onEdit(id);
  };

  return (
    <div onContextMenu={handleRightClick} style={{ padding: 10, border: '1px solid #000', backgroundColor: '#fff' }}>
      {data.label}
      <Handle type="source" position="right" />
      <Handle type="target" position="left" />
      <LayerContextMenu 
        onEdit={() => onEdit(id)}
        onDelete={() => onDelete(id)}
        onUnlink={() => onUnlink(id)}
      />
    </div>
  );
};

export default Layer;
