// import React, { useEffect, useState } from 'react';
// import Board from './components/Board';
// import './App.css';

// const STORAGE_KEY = 'haider-airtribe';

// const defaultData = {
//   statuses: [
//     { id: 1, title: 'To Do', tasks: [] },
//     { id: 2, title: 'In Progress', tasks: [] },
//     { id: 3, title: 'Done', tasks: [] },
//   ],
// };
import React, { useEffect, useState } from 'react';
import Board from './components/Board';
import './App.css';

const STORAGE_KEY = 'divyanshu-airtribe';

const defaultData = {
  statuses: [
    { id: 1, title: 'To Do', tasks: [] },
    { id: 2, title: 'In Progress', tasks: [] },
    { id: 3, title: 'Done', tasks: [] },
  ],
};

function App() {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultData
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addTask = (statusId, taskName, taskDescription) => {
    const newData = { ...data };
    const status = newData.statuses.find((s) => s.id === statusId);
    status.tasks.push({ id: Date.now(), name: taskName, description: taskDescription });
    setData(newData);
    console.log(data.statuses)
  };

  const removeTask = (statusId, taskId) => {
    const newData = { ...data };
    const status = newData.statuses.find((s) => s.id === statusId);
    status.tasks = status.tasks.filter((t) => t.id !== taskId);
    setData(newData);
  };

  const updateTask = (statusId, taskId, newName, newDescription) => {
    const newData = { ...data };
    const status = newData.statuses.find((s) => s.id === statusId);
    const task = status.tasks.find((t) => t.id === taskId);
    task.name = newName;
    task.description = newDescription;
    setData(newData);
  };

  const moveTask = (sourceStatusId, destinationStatusId, taskId, destinationIndex) => {
    const newData = { ...data };
    const sourceStatus = newData.statuses.find((s) => s.id === sourceStatusId);
    const destinationStatus = newData.statuses.find((s) => s.id === destinationStatusId);
    const [taskToMove] = sourceStatus.tasks.splice(
      sourceStatus.tasks.findIndex((t) => t.id === taskId),
      1
    );
    destinationStatus.tasks.splice(destinationIndex, 0, taskToMove);
    setData(newData);
  };

  const addStatus = () => {
    const newStatusTitle = prompt('Enter new status title:');
    if (newStatusTitle) {
      const newData = { ...data };
      const newStatus = { id: Date.now(), title: newStatusTitle, tasks: [] };
      newData.statuses.push(newStatus);
      setData(newData);
    }
  };

  const removeStatus = (statusId)=>{
    if (window.confirm(`Are you sure you want to delete the status?`)) {
      const newData = { ...data };
      newData.statuses = newData.statuses.filter((s) => s.id !== statusId);
      setData(newData);
    }
  }


  return (
    <div className="App">
      <Board
        data={data}
        addTask={addTask}
        removeTask={removeTask}
        updateTask={updateTask}
        moveTask={moveTask}
        addStatus={addStatus}
        removeStatus={removeStatus}
      />
    </div>
  );
}

export default App;