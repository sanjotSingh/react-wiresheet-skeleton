// src/components/Sidebar.js
import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = 'LAYER';

const SidebarItem = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '8px',
        backgroundColor: 'lightgrey',
        cursor: 'move',
      }}
    >
      {label}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div style={{ width: '200px', backgroundColor: '#f0f0f0', padding: '16px' }}>
      <SidebarItem type="layer" label="Layer" />
      {/* Add more SidebarItem components for different types of layers */}
    </div>
  );
};

export default Sidebar;
