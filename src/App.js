// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Wiresheet from './components/Wiresheet';
import './App.css';

import { ReactFlowProvider } from 'react-flow-renderer';

function App() {
  return (
    <Provider store={store}>
      <ReactFlowProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <Wiresheet />
          </div>
        </DndProvider>
      </ReactFlowProvider>
    </Provider>
  );
}

export default App;
