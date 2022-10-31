import React, {FC, FormEvent, useState} from 'react';
import {ITaskItem} from '../../intefaces';
import {TaskType} from '../../enums';
import styles from './FormAdd.module.css';

type FormAddProps = {
  addTask: (newTaskItem: ITaskItem) => void
}
const FormAdd: FC<FormAddProps> = ({addTask}) => {

  const [value, setValue] = useState<string>('')
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (value) {
      addTask({id: Date.now(), text: value, type: TaskType.active})
    }
    setValue('')
  }

  return (
    <form onSubmit={submitHandler} role='form-add'>
      <input type="text" placeholder='What needs to be done?'
             value={value}
             onChange={inputChangeHandler}
             className={styles.input}
      />
    </form>
  );
};

export default FormAdd;