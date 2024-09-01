import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ChapterContext } from '../../lib/ChapterContext';

export default function App() {
  const chapter = useContext(ChapterContext);
  return (
    <>
      <h1>Chapter {chapter}：Reactのライフサイクル</h1>
      <div className="flex flex-wrap justify-center items-center gap-4 p-4">
        <div className="flex-grow basis-1/2 md:basis-1/3 lg:basis-1/4 p-4 m-2">
          <Counter />
        </div>
      </div>
    </>
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
      <p className='mb-4'>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
