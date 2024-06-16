// src/redux/wiresheetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  connections: [],
};

const wiresheetSlice = createSlice({
  name: 'wiresheet',
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action) => {
      const index = state.nodes.findIndex((node) => node.id === action.payload.id);
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
    updateNodePosition: (state, action) => {
      const { id, position } = action.payload;
      const index = state.nodes.findIndex((node) => node.id === id);
      if (index !== -1) {
        state.nodes[index].position = position;
      }
    },
    addConnection: (state, action) => {
      state.connections.push(action.payload);
    },
  },
});

export const { addNode, updateNode, updateNodePosition, addConnection } = wiresheetSlice.actions;

export default wiresheetSlice.reducer;
