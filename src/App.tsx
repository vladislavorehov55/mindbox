import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import FormAdd from './components/FormAdd/FormAdd';
import {ITaskItem} from './intefaces';
import {FilterType, TaskType} from './enums';
import TasksList from './components/TasksList/TasksList';
import BottomPanel from './components/BottomPanel/BottomPanel';


function App() {
  const [tasksList, setTasksList] = useState<ITaskItem[]>([
    {
      id: 1,
      type: TaskType.active,
      text: 'Vlad the best'
    }
  ])
  const [activeTasksCount, setCompletedCountTask] = useState<number>(0)
  const [filteredType, setFilteredType] = useState<FilterType>(FilterType.all)


  const displayedTasksList = useMemo(() => {
    switch (filteredType) {
      case FilterType.all:
        return tasksList
      case FilterType.active:
        return tasksList.filter(taskItem => taskItem.type === TaskType.active)
      case FilterType.completed:
        return tasksList.filter(taskItem => taskItem.type === TaskType.completed)
    }
  }, [filteredType, tasksList])

  const addTask = (newTaskItem: ITaskItem) => {
    console.log('ma')
    setTasksList([...tasksList, newTaskItem])
  }
  const completeTask = (id: number) => {
    setTasksList(tasksList.map(taskItem => {
      if (taskItem.id === id) {
        taskItem.type = taskItem.type === TaskType.active ? TaskType.completed : TaskType.active
      }
      return taskItem
    }))
  }
  const filterTasks = (filterType: FilterType) => {
    setFilteredType(filterType)
  }

  const clearCompleted = () => {
    setTasksList(tasksList.filter(taskItem => taskItem.type !== 'completed'))
  }

  useEffect(() => {
    setCompletedCountTask(displayedTasksList.filter(item => item.type === TaskType.active).length)
  },[displayedTasksList])

  return (
    <div className="app">
      <FormAdd addTask={addTask}/>
      <TasksList tasksList={displayedTasksList} completeTask={completeTask}/>
      <BottomPanel activeTasksCount={activeTasksCount}
                   filterTasks={filterTasks}
                   clearCompleted={clearCompleted}
                   filteredType={filteredType}
      />
    </div>
  );
}

export default App;
