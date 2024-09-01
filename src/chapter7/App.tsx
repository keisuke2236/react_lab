import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ChapterContext } from '../ChapterContext';

export default function App() {
  const chapter = useContext(ChapterContext);
  return (
    <div>
      <h1>Chapter {chapter}：Reactのライフサイクル</h1>
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('マウント');

    return () => {
      console.log('削除（アンマウント）');
    };
  }, []); // 空の依存配列：マウント時とアンマウント時のみ実行

  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]); // count が変更されるたびに実行

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
