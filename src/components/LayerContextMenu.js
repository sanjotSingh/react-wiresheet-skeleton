// src/components/LayerContextMenu.js
import React from 'react';
import { Menu, Item, Separator, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = "layer-context-menu";

const LayerContextMenu = ({ onEdit, onDelete, onUnlink }) => {
  const { show } = useContextMenu({ id: MENU_ID });

  const handleContextMenu = (event) => {
    event.preventDefault();
    show(event);
  };

  return (
    <>
      <Menu id={MENU_ID}>
        <Item onClick={onEdit}>Edit</Item>
        <Item onClick={onDelete}>Delete</Item>
        <Separator />
        <Item onClick={onUnlink}>Unlink</Item>
      </Menu>
    </>
  );
};

export default LayerContextMenu;
