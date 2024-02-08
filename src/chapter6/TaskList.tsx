import { useState } from 'react';
import { useContext } from 'react';
import { Tasks, Task } from './tasksReducer';
import { TasksContext, TasksDispatchContext } from './TasksProviders';
import { Action } from './tasksReducer';

export default function TaskList() {
  const tasks: Tasks | null = useContext(TasksContext);
  return tasks && (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <TaskContent task={task} />
        </li>
      ))}
    </ul>
  );
}

function TaskContent({ task }: { task: Task }) {
  const dispatch: React.Dispatch<Action> | null = useContext(TasksDispatchContext);
  if (!dispatch) { return null; }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: '変更', id: task.id, text: e.target.value, done: task.done });
  }

  const handleDone = () => {
    dispatch({ type: '変更', id: task.id, text: task.text, done: !task.done });
  }

  const handleDelete = () => {
    dispatch({ type: '削除', id: task.id, text: task.text, done: task.done });
  }

  const [isEditing, setIsEditing] = useState(false);
  let taskContent;

  if (isEditing) {
    taskContent = (
      <>
        <input value={task.text} onChange={handleChange} />
        <button onClick={() => setIsEditing(false)}>保存する</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>編集する</button>
      </>
    );
  }

  return (
    <label>
      <input type="checkbox" checked={task.done} onChange={handleDone} />
      {taskContent}
      <button onClick={handleDelete}>削除する</button>
    </label>
  );
}
