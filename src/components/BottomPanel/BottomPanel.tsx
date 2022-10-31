import React, {FC, useCallback} from 'react';
import {FilterType} from '../../enums';
import styles from './BottomPanel.module.css';

type BottomPanelProps = {
  activeTasksCount: number,
  filteredType: FilterType,
  filterTasks: (filterType: FilterType) => void,
  clearCompleted: () => void
}
const BottomPanel: FC<BottomPanelProps> = ({activeTasksCount, filterTasks, clearCompleted, filteredType}) => {
  const btnArr = [
    {text: 'All', type: FilterType.all},
    {text: 'Active', type: FilterType.active},
    {text: 'Completed', type: FilterType.completed}
  ]
  const getBtnClasses = useCallback((type: FilterType) => {
    return type === filteredType ? `${styles.btn} ${styles.btnActive}` : styles.btn
  }, [filteredType])

  return (
    <div className={styles.container}>
      <span>{activeTasksCount} items left</span>
      <div>
        {
          btnArr.map((btn, ind) => {
            return <button key={ind} className={getBtnClasses(btn.type)} onClick={() => filterTasks(btn.type)}>{btn.text}</button>
          })
        }
      </div>
     <button className={styles.btn} onClick={clearCompleted}>Clear completed</button>
    </div>
  );
};

export default BottomPanel;