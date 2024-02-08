import { useState } from 'react';
import { useContext } from 'react';
import { TasksDispatchContext, TasksContext } from './TasksProviders';
import { Action } from './tasksReducer';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch: React.Dispatch<Action> | null = useContext(TasksDispatchContext);
  const tasks = useContext(TasksContext);

  function handleAddClick() {
    const nextId = tasks ? tasks.length + 1 : 0;
    if (dispatch) {
      dispatch({ type: '追加', id: nextId, text: text, done: false });
      setText('');
    }
  }

  return (
    <>
      <input placeholder="追加" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleAddClick}>追加</button>
    </>
  )
}
