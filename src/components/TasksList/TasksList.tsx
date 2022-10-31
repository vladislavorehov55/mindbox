import React, {FC} from 'react';
import {ITaskItem} from '../../intefaces';
import TaskItem from './TaskItem/TaskItem';
import styles from './TasksList.module.css'
type TaskSListProps = {
  tasksList: ITaskItem[],
  completeTask: (id: number) => void
}
const TasksList: FC<TaskSListProps> = ({tasksList, completeTask}) => {
  return (
    <ul className={styles.list}>
      {
        tasksList.map(taskItem => <TaskItem taskItem={taskItem} key={taskItem.id} completeTask={completeTask}/>)
      }
    </ul>
  );
};

export default TasksList;