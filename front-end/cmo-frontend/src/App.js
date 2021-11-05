import React from 'react';
import Tasks from './tasks';
import TaskComponent from './components/taskComponents';
import './App.css';

class App extends Tasks {
  render() { 
    return (
      <div className="App flex">
        <TaskComponent />
      </div>
    )
  }
}
 
export default App;
